const express = require("express")
const asyncHandler = require("express-async-handler")
const Product = require("../models/productModel")



// @desc Get All Product 
// @route /api/product
// @access public
const getProduct =  asyncHandler( async (req,res)=>{
    const products = await Product.find({})
    res.json(products)
})

// @desc Get a single Product
// @route /api/product/:id 
// @access public
const getProductById = asyncHandler( async (req,res)=>{
    const product= await Product.findById(req.params.id)
    console.log(product)
    if(product){
        res.send(product)
    }else{
        res.status(400).json({message:"Error Product not found"})
    }
})

module.exports = {
    getProduct,
    getProductById
}