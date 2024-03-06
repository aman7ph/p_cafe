import mongoose from "mongoose"
import User from "./userModel.js"

const productSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: ["food", "drink"],
      default: "food",
    },

    price: {
      type: Number,
      required: true,
      default: 0,
    },
    status: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
)

const Product = mongoose.model("Product", productSchema)

export default Product
