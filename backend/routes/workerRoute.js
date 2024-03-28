import {
  getAllWorkers,
  getWorkerById,
  addWorker,
  updateWorker,
  deleteWorker,
  addNegativeBalance,
  subtractNegativeBalance,
} from "../controller/mongo/workerController.js";
import express from "express";
const router = express.Router();
import { protect, admin } from "../middleware/authMidleware.js";
import { workerValidation } from "./../middleware/order validation.js";
router
  .route("/")
  .get(protect, admin, getAllWorkers)
  .post(protect, admin, workerValidation, addWorker);

router
  .route("/:id")
  .get(protect, admin, getWorkerById)
  .put(protect, admin, workerValidation, updateWorker)
  .delete(protect, admin, deleteWorker);
router.route("/:id/addnegativebalance").put(protect, admin, addNegativeBalance);
router
  .route("/:id/subtractnegativebalance")
  .put(protect, admin, subtractNegativeBalance);

export default router;
