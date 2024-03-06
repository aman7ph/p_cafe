import express from "express"
import {
  getAllPromotion,
  createPromotion,
  updatePromotion,
  deletePromotion,
  getPromotion,
} from "../controller/promotionController.js"
const router = express.Router()
import { protect, admin } from "./../middleware/authMidleware.js"
router.route("/").get(getAllPromotion).post(protect, admin, createPromotion)
router
  .route("/:id")
  .get(getPromotion)
  .put(protect, admin, updatePromotion)
  .delete(protect, admin, deletePromotion)
export default router
