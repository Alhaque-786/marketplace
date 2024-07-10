const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const notificationSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User" },
  message: String,
  sent: { type: Boolean, default: false },
});

module.exports = mongoose.model("Notification", notificationSchema);
