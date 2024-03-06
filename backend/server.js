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
import { notFound, errorHandler } from "./middleware/errorMidleware.js"
import morgan from "morgan"
import cookieParser from "cookie-parser"
import axios from "axios"
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
const __dirname = path.resolve()
console.log(__dirname)
app.use("/uploads", express.static(path.join(__dirname, "/uploads")))

app.get("/api/config/paypal", (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
)
// app.get("/api/config/chapa", (req, res) =>
//   res.send(process.env.PAYPAL_CLIENT_ID)
// )
app.post("/api/chapa", async (req, res) => {
  try {
    console.log(req.body)
    const response = await axios.post(
      "https://api.chapa.co/v1/transaction/initialize",
      req.body,
      {
        headers: {
          Authorization: `Bearer ${process.env.CHAPA_CLIENT_ID}`,
          "Content-Type": "application/json",
        },
      }
    )

    console.log(response.data)
    res.json(response.data)
  } catch (error) {
    console.error("Error proxying request to Chapa API:", error.response.data)
    res.status(500).json({ error: "Internal Server Error" })
  }
})
app.get("/api/chapa/:id", async (req, res) => {
  try {
    console.log(req.params.id)
    const response = await axios.get(
      `https://api.chapa.co/v1/transaction/verify/order-${req.params.id}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.CHAPA_CLIENT_ID}`,
          "Content-Type": "application/json",
        },
      }
    )

    console.log(response.data)
    res.json(response.data)
  } catch (error) {
    console.error("Error proxying request to Chapa API:", error.response.data)
    res.status(500).json({ error: "Internal Server Error" })
  }
})
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
