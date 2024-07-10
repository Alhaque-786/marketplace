const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const logSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User" },
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Log", logSchema);
