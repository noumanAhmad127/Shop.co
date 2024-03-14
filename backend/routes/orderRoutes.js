const express = require("express");
const protect = require("../middleware/authMiddleware");
const {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
} = require("../controller/orderController");
const router = express.Router();

router.route("/").post(protect, addOrderItems);
router.route("/:id").get(protect, getOrderById);
router.route("/:id/pay").get(protect, updateOrderToPaid);

module.exports = router;
