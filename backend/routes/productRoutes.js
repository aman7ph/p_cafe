import express from "express";
import {
  getAllProduct,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  updateProductStatus,
  getLandingPageProduct,
  getAllProductForAdmin,
} from "./../controller/mongo/productController.js";
import { protect, admin } from "./../middleware/authMidleware.js";
import { productValidation } from "./../middleware/order validation.js";

const router = express.Router();

router.route("/").get(getAllProduct);
router.get("/landingPage", getLandingPageProduct);
router.route("/all").get(getAllProductForAdmin);
router
  .route("/:id")
  .get(getProduct)
  .put(protect, admin, updateProduct)
  .delete(protect, admin, deleteProduct);
router.route("/create").post(protect, admin, productValidation, createProduct);
router.route("/:id/status").put(protect, admin, updateProductStatus);

export default router;
