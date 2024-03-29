import express from "express"
import {
  createFeedback,
  getFeedbacks,
  getFeedbackByid,
  deleteFeedback,
} from "../controller/feedbackController.js"

const router = express.Router()

router.route("/").post(createFeedback).get(getFeedbacks)
router.route("/:id").get(getFeedbackByid).delete(deleteFeedback)

export default router
