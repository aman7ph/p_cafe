import express from "express";
import {
  createFeedback,
  getFeedbacks,
  getFeedbackByid,
  deleteFeedback,
} from "../controller/feedbackController.js";
import { protect, admin } from "./../middleware/authMidleware.js";

const router = express.Router();
router.route("/").post(createFeedback);
router.use(protect, admin);
router.route("/").get(getFeedbacks);
router.route("/:id").get(getFeedbackByid).delete(deleteFeedback);

export default router;
