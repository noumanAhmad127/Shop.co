const path = require("path");
const morgan = require("morgan");
const express = require("express");
const dontenv = require("dotenv");
const connectDb = require("./config/db");
const productRoutes = require("./routes/productRoutes");
const UserRoutes = require("./routes/userRoutes");
const OrderRoutes = require("./routes/orderRoutes");
const UploadRoutes = require("./routes/uploadRoutes");
// const { default: products } = require("./products")

dontenv.config();
connectDb();
const app = express();
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(express.json());

app.use("/api/products", productRoutes);
app.use("/api/users", UserRoutes);
app.use("/api/orders", OrderRoutes);
app.use("/api/upload", UploadRoutes);

app.use("/api/config/stripe", (req, res) => process.env.STRIPE_PUBLISHED_KEY);

var __dirname = path.resolve();
app.use("/upload", express.static(path.join(__dirname, "/upload")));
const PORT = process.env.PORT;

app.listen(PORT, console.log(`server is running on port ${PORT}`));
