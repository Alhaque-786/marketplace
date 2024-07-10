const express = require("express");
const router = express.Router();
const { subscribeUser } = require("../services/paymentService");

router.post("/subscribe", subscribeUser);

module.exports = router;
