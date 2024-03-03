import express from "express"

import {
  addOrderItems,
  getMyOrders,
  getOrderById,
  updateOrderToPaid,
  getOrders,
  updateOrderToDelivered,
  updateOrder,
} from "./../controller/orderController.js"
import { protect, admin } from "./../middleware/authMidleware.js"

const router = express.Router()

router.route("/").post(addOrderItems).get(protect, admin, getOrders)
router.route("/myorders").get(protect, getMyOrders)
router.route("/:id").get(getOrderById)
router.route("/:id/pay").put(protect, updateOrderToPaid)
router.route("/:id/deliver").put(protect, admin, updateOrderToDelivered)
router.route("/:id/update").put(updateOrder)
export default router
