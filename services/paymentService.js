const Razorpay = require("razorpay");
const { User } = require("../models/User");
const Log = require("../models/Log");
const redis = require("../config/redis");

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

async function subscribeUser(req, res) {
  const { name, email, age } = req.body;
  try {
    let user = await User.findOne({ email });
    if (!user) {
      user = new User({ name, email, age });
    }
    user.subscribed = true;
    await user.save();

    const options = {
      amount: 50000,
      currency: "INR",
      receipt: `receipt_order_${user._id}`,
    };

    const order = await razorpay.orders.create(options);
    res.json({ orderId: order.id, userId: user._id });
  } catch (error) {
    res.status(500).send(error.toString());
  }
}

async function verifyPayment(req, res) {
  const { razorpay_payment_id, razorpay_order_id, razorpay_signature, userId } =
    req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send("User not found");
    }

    user.subscribed = true;
    await user.save();

    const log = new Log({ userId: user._id });
    await log.save();

    // Adding notification to Redis queue
    await redis.lpush(
      "notifications",
      JSON.stringify({ userId: user._id, message: "Subscription successful" })
    );

    res.send("Payment verified and user subscribed");
  } catch (error) {
    res.status(500).send(error.toString());
  }
}

module.exports = { subscribeUser, verifyPayment };
