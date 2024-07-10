const redis = require("../config/redis");
const { User } = require("../models/User");
const { sendEmail } = require("./emailService");

async function processNotifications() {
  while (true) {
    const notification = await redis.rpop("notifications");
    if (notification) {
      const { userId, message } = JSON.parse(notification);
      const user = await User.findById(userId);
      if (user) {
        await sendEmail(user.email, "Notification", message);
      }
    }
  }
}

processNotifications();

module.exports = { processNotifications };
