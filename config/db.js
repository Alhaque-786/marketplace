// config/db.js
const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://alhaque:Khan123*@cluster0.tfxynwd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("Connected to the database");
});

module.exports = db;
