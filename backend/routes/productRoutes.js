import express from "express"
import {
  getAllProduct,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  createReviewProduct,
  getTopProduct,
  getLandingPageProduct,
} from "./../controller/productController.js"
import { protect, admin } from "./../middleware/authMidleware.js"

const router = express.Router()

router.route("/").get(getAllProduct)
router.get("/top", getTopProduct)
router.get("/landingPage", getLandingPageProduct)
router
  .route("/:id")
  .get(getProduct)
  .put(protect, admin, updateProduct)
  .delete(protect, admin, deleteProduct)
router.route("/create").post(protect, admin, createProduct)
router.route("/:id/review").post(protect, createReviewProduct)

export default router
