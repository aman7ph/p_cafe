import express from "express"
import {
  createFeedback,
  getFeedbacks,
} from "../controller/feedbackController.js"

const router = express.Router()

router.route("/").post(createFeedback).get(getFeedbacks)

export default router
