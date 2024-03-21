const express = require("express");
const {
  getProduct,
  getProductById,
  deleteProduct,
  updateProduct,
  createProduct,
  createReview,
} = require("../controller/productController");
const { protect, admin } = require("../middleware/authMiddleware");
const router = express.Router();

router.route("/").get(getProduct).post(protect, admin, createProduct);
router
.route("/:id")
.get(getProductById)
.delete(protect, admin, deleteProduct)
.put(protect, admin, updateProduct);

router.route("/:id/reviews").post(protect, createReview);
module.exports = router;
