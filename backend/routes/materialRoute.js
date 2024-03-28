import express from "express";
import {
  createMaterial,
  getMaterialById,
  getAllMaterials,
  deleteMaterialById,
  addMaterials,
  subtractMaterials,
} from "./../controller/pg/materialController.js";
import { protect, admin } from "./../middleware/authMidlewarePG.js";

const router = express.Router();
router.use(protect, admin);
router.route("/").get(getAllMaterials).post(createMaterial);
router.route("/:id").get(getMaterialById).delete(deleteMaterialById);
router.route("/add/:id").put(addMaterials);
router.route("/substract/:id").put(subtractMaterials);

export default router;
