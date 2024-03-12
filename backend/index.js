const express = require("express")
const dontenv = require("dotenv")
const connectDb = require("./config/db")
const productRoutes = require("./routes/productRoutes")
const UserRoutes = require("./routes/userRoutes")
// const { default: products } = require("./products")


dontenv.config()
connectDb()
const app = express()
app.use(express.json())

app.use('/api/products',productRoutes)
app.use('/api/users',UserRoutes)
const PORT = process.env.PORT

app.listen(PORT,console.log(`server is running on port ${PORT}`))