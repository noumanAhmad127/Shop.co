const express = require("express");
const asyncHandler = require("express-async-handler");
const Product = require("../models/productModel");
const Order = require("../models/orderModel");

// @desc create new order
// @route /api/orders
// @access private
const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    cartItemPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(401).json({ message: "No Order Items" });
    throw new Error("No Order Items");
  } else {
    const order = new Order({
      user: req.user._id,
      orderItems,
      shippingAddress,
      paymentMethod,
      cartItemPrice,
      shippingPrice,
      totalPrice,
    });

    const createdOrder = await order.save();

    res.status(201).json(createdOrder);
  }
});

module.exports = addOrderItems;
