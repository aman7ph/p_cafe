import express from "express";
import {
  createFeedback,
  getFeedbacks,
  getFeedbackById,
  deleteFeedback,
} from "../controller/pg/feedbackController.js";
import { protect, admin } from "./../middleware/authMidlewarePG.js";

const router = express.Router();
router.route("/").post(createFeedback);
router.use(protect, admin);
router.route("/").get(getFeedbacks);
router.route("/:id").get(getFeedbackById).delete(deleteFeedback);

export default router;
