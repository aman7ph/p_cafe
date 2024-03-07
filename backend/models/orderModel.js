import mongoose from "mongoose"

const orderSchema = mongoose.Schema(
  {
    owner: {
      type: String,
      required: [true, "Please enter your name"],
    },
    orderNumber: {
      type: String,
      required: [true, "Please enter your order number"],
    },
    phoneNumber: {
      type: String,
      required: [true, "Please enter your phone number"],
    },
    orderItems: [
      {
        name: { type: String, required: true },
        qty: { type: Number, required: true },
        image: { type: String, required: true },
        price: { type: Number, required: true },
        _id: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "Product",
        },
      },
    ],

    totalPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    isPaid: {
      type: Boolean,

      default: false,
    },
    paidAt: {
      type: Date,
    },
    ariveTime: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

const Order = mongoose.model("Order", orderSchema)

export default Order
