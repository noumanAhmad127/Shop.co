const express = require("express");
const protect = require("../middleware/authMiddleware");
const addOrderItems = require("../controller/orderController");
const router = express.Router();

router.route("/").post(protect, addOrderItems);

module.exports = router;
