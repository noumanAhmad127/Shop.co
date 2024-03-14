const express = require("express");
const dontenv = require("dotenv");
const connectDb = require("./config/db");
const productRoutes = require("./routes/productRoutes");
const UserRoutes = require("./routes/userRoutes");
const OrderRoutes = require("./routes/orderRoutes");
// const { default: products } = require("./products")

dontenv.config();
connectDb();
const app = express();
app.use(express.json());

app.use("/api/products", productRoutes);
app.use("/api/users", UserRoutes);
app.use("/api/orders", OrderRoutes);
app.use("/api/config/stripe", (req, res) => process.env.STRIPE_PUBLISHED_KEY);
const PORT = process.env.PORT;

app.listen(PORT, console.log(`server is running on port ${PORT}`));
