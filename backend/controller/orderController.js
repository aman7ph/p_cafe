import asyncHandler from "express-async-handler"
import Order from "../models/orderModel.js"
import { generateRandom4DigitNumber } from "../utils/generateOrderNumber.js"

const addOrderItems = asyncHandler(async (req, res) => {
  const { orderItems, owner, phoneNumber, ariveTime, totalPrice } = req.body

  if (orderItems && orderItems.length === 0) {
    res.status(400)
    throw new Error("No order items")
  } else {
    const order = await Order.create({
      orderItems: orderItems,
      // .map((item) => ({
      //   ...item,
      //   product: item._id,
      //   _id: undefined,
      // })),
      owner,
      phoneNumber,
      ariveTime,
      totalPrice,
      orderNumber: generateRandom4DigitNumber(),
    })

    res.status(201).json(order)
  }
})

const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id })
  if (!orders) {
    res.status(404)
    throw new Error("Order not found")
  }
  res.status(200).json(orders)
})

const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)
  if (!order) {
    res.status(404)
    throw new Error("Order not found")
  }
  res.status(200).json(order)
})

const updateOrderToPaid = asyncHandler(async (req, res) => {
  const updateOrder = await Order.findByIdAndUpdate(
    req.params.id,
    {
      isPaid: true,
      paidAt: Date.now(),
      paymentResult: {
        id: req.body.id,
        status: req.body.status,
        update_time: req.body.update_time,
        email_address: req.body.email_address,
      },
    },
    {
      new: true,
      runValidators: true,
    }
  )
  if (!updateOrder) {
    res.status(404)
    throw new Error("order not found")
  }
  res.status(200).json({ updateOrder })
})

const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({})
  if (!orders) {
    res.status(404)
    throw new Error("Order not found")
  }
  res.status(200).json(orders)
})

const updateOrderToDelivered = asyncHandler(async (req, res) => {
  const updateOrder = await Order.findByIdAndUpdate(
    req.params.id,
    {
      isDelivered: true,
      deliveredAt: Date.now(),
    },
    {
      new: true,
      runValidators: true,
    }
  )
  if (!updateOrder) {
    res.status(404)
    throw new Error("order not found")
  }
  res.status(200).json({ updateOrder })
})
const updateOrder = asyncHandler(async (req, res) => {
  const { id } = req.params
  const order = await Order.findById(id)
  if (order) {
    order.orderItems = req.body.orderItems || order.orderItems
    order.owner = req.body.owner || order.owner
    order.phoneNumber = req.body.phoneNumber || order.phoneNumber
    order.ariveTime = req.body.ariveTime || order.ariveTime
    order.totalPrice = req.body.totalPrice || order.totalPrice
    const updatedOrder = await order.save()
    res.json(updatedOrder)
  } else {
    res.status(404)
    throw new Error("Order not found")
  }
})

export {
  addOrderItems,
  getMyOrders,
  getOrderById,
  updateOrderToPaid,
  getOrders,
  updateOrderToDelivered,
  updateOrder,
}
