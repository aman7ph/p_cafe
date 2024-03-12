import path from "path"
import express from "express"
import dotenv from "dotenv"
import DbConnection from "./config/db.js"
import productRouter from "./routes/productRoutes.js"
import UserRouter from "./routes/userRoutes.js"
import orderRouter from "./routes/orderRoutes.js"
import uploadRouter from "./routes/uploadRoutes.js"
import feedbackRouter from "./routes/feedbackRoute.js"
import promotionRouter from "./routes/promotionRoute.js"
import materialRouter from "./routes/materialRoute.js"
import { notFound, errorHandler } from "./middleware/errorMidleware.js"
import morgan from "morgan"
import cookieParser from "cookie-parser"

dotenv.config()

const port = process.env.PORT || 5050

DbConnection()
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(morgan("dev"))
app.use("/api/products", productRouter)
app.use("/api/users", UserRouter)
app.use("/api/orders", orderRouter)
app.use("/api/uploads", uploadRouter)
app.use("/api/feedback", feedbackRouter)
app.use("/api/promotions", promotionRouter)
app.use("/api/materials", materialRouter)
const __dirname = path.resolve()
console.log(__dirname)
app.use("/uploads", express.static(path.join(__dirname, "/uploads")))

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/build")))
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
  )
} else {
  app.get("/", (req, res) => {
    res.send("API is running....")
  })
}

app.use(notFound)
app.use(errorHandler)

app.listen(port, () => {
  console.log(`server runing on port ${port}`)
})

process.on("unhandledRejection", (err, promise) => {
  console.log(`Unhandle rejection......`)
  console.log(`Logged Error: ${err}`)
  server.close(() => process.exit(1))
})
