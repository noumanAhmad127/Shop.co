
const express = require("express")
const Product = require("../models/productModel")
const { getProduct, getProductById } = require("../controller/productController")
const router = express.Router()


router.route('/').get(getProduct )
router.route('/:id').get(getProductById)


module.exports = router