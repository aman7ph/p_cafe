import mongoose from "mongoose"
import DbConnection from "../config/db.js"
import dotenv from "dotenv"
import User from "../models/userModel.js"
import Order from "../models/orderModel.js"
import Product from "../models/productModel.js"
import products from "./products.js"
import users from "./users.js"

dotenv.config()
DbConnection()

const importData = async () => {
  try {
    await Order.deleteMany()
    await Product.deleteMany()
    await User.deleteMany()

    const createdUsers = await User.insertMany(users)
    const admin = createdUsers.find((el) => el.role === "admin")

    const sampleProduct = products.map((product) => {
      return { ...product, user: admin }
    })

    await Product.insertMany(sampleProduct)

    console.log("Data Imported!")
    process.exit()
  } catch (error) {
    console.error(`${error}`)
    process.exit(1)
  }
}
const deleteData = async () => {
  try {
    await Order.deleteMany()
    await Product.deleteMany()
    await User.deleteMany()
    console.log("Data deleted succesfuly")
    process.exit()
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}
if (process.argv[2] === "--delete") {
  deleteData()
} else if (process.argv[2] === "--import") {
  importData()
}
