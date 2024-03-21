const express = require("express");
const asyncHandler = require("express-async-handler");
const Product = require("../models/productModel");

// @desc Get All Product
// @route /api/products
// @access public
const getProduct = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  res.json(products);
});

// @desc Get a single Product
// @route /api/products/:id
// @access public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  console.log(product);
  if (product) {
    res.send(product);
  } else {
    res.status(400).json({ message: "Error Product not found" });
  }
});

// @desc Delete a single Product
// @route DELETE /api/products/:id
// @access private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  console.log(product);
  if (product) {
    await product.deleteOne();
    res.status(201).json({ message: "Product Removed" });
  } else {
    res.status(400).json({ message: " Product not found" });
    throw new Error("Product not found");
  }
});

const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: "Sample Name",
    price: 0,
    user: req.user._id,
    image: "/image/sampleImge.png",
    brand: "Sample Brand",
    category: "Sample Category",
    countInStock: 0,
    numReview: 0,
    description: "Sample Description",
  });

  const createdProduct = await product.save();
  if (createdProduct) {
    res.status(201).json(createdProduct);
  } else {
    res.status(400).json({ message: "Product Can't Created" });
    throw new Error("Product Can't Created");
  }
});

const updateProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  const { name, price, image, brand, category, countInStock, description } =
    req.body;
  if (product) {
    product.name = name;
    product.price = price;
    product.image = image;
    product.brand = brand;
    product.category = category;
    product.countInStock = countInStock;
    product.description = description;

    const updatedProduct = await product.save();
    if (updatedProduct) {
      res.status(201).json(updateProduct);
    }
  } else {
    res.status(400).json({ message: " Product not found" });
    throw new Error("Product not found");
  }
});

const createReview = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  const { rating, comment } = req.body;

  if (product) {
    const alreadyReviewed = product.review.find(
      (r) => r.user.toString() === req.user._id.toString()
    );

    if (alreadyReviewed) {
      res.status(400).json({ message: " Product already reviewed" });
      throw new Error("Product already reviewed");
    }

    const reviews = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    };

    product.review.push(reviews);

    product.numReviews = product.review.length;
    const totalRating = product.review.reduce(
      (acc, item) => acc + item.rating,
      0
    );
    product.rating = totalRating / product.review.length;
    await product.save();

    res.status(200).json({ message: "Review Added" });
  } else {
    res.status(400).json({ message: " Product not found" });
    throw new Error("Product not found");
  }
});

module.exports = {
  getProduct,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
  createReview,
};
