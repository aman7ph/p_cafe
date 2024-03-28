import express from "express";

import {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  getOrders,
  paiedOrder,
  updateOrder,
  getorderbyorderNumber,
} from "./../controller/mongo/orderController.js";
import { orderValidation } from "./../middleware/order validation.js";
import { protect, admin } from "./../middleware/authMidleware.js";

const router = express.Router();

router
  .route("/")
  .post(orderValidation, addOrderItems)
  .get(protect, admin, getOrders);
router.get("/paiedOrder", protect, admin, paiedOrder);
router.route("/:id").get(getOrderById);
router.route("/:id/pay").put(protect, updateOrderToPaid);
router.route("/:id/update").put(updateOrder);
router.route("/orderNumber/:orderNumber").get(getorderbyorderNumber);

export default router;
