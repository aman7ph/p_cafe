import express from "express";
import {
  createMaterial,
  getMaterialById,
  getAllMaterials,
  deleteMaterialById,
  addMaterials,
  substractMaterials,
} from "./../controller/mongo/materialController.js";
import { protect, admin } from "./../middleware/authMidleware.js";

const router = express.Router();
router.use(protect, admin);
router.route("/").get(getAllMaterials).post(createMaterial);
router.route("/:id").get(getMaterialById).delete(deleteMaterialById);
router.route("/add/:id").put(addMaterials);
router.route("/substract/:id").put(substractMaterials);

export default router;
