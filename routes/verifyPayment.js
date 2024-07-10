const express = require("express");
const router = express.Router();
const { verifyPayment } = require("../services/paymentService");

router.post("/verify-payment", verifyPayment);

module.exports = router;
