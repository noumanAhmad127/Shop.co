const mongoose = require("mongoose");
const dotenv = require("dotenv");
const connectDb = require("./config/db");
const User = require("./models/userModel");
const users = require("./data/users");
const Product = require("./models/productModel");
const products = require("./data/products");
const Order = require("./models/orderModel");


dotenv.config();
connectDb();

const importData = async () => {
  try {
    const createdUsers = await User.insertMany(users);
    const adminUser = createdUsers[0]._id;

    const sampleProducts = products.map((products) => {
      return { ...products, user: adminUser };
    });

    await Product.insertMany(sampleProducts);
    console.log("Data Inserted Successfully");
    process.exit();
  } catch (error) {
    console.error("Error: ", error);
    process.exit(1);
  }
};

const deleteData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    console.log("Data Destroyed Successfully");

    process.exit();
  } catch (error) {
    console.error("Error: ", error);
    process.exit(1);
  }
};


if (process.argv[2]==='-d') {
    deleteData()
} else {
    importData()
}