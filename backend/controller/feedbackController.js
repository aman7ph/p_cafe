import Feedback from "../models/feedbackModel.js"
import asyncHandler from "express-async-handler"

export const createFeedback = asyncHandler(async (req, res) => {
  const { name, email, comment } = req.body
  const feedback = await Feedback.create({
    name,
    email,
    comment,
  })
  if (feedback) {
    console.log(feedback)
    res.status(201).json({ feedback: feedback })
  } else {
    res.status(400)
    throw new Error("Invalid feedback data")
  }
})
export const getFeedbacks = asyncHandler(async (req, res) => {
  const feedbacks = await Feedback.find({}).limit(4).sort({ createdAt: -1 })
  if (feedbacks) {
    res.status(200).json(feedbacks)
  } else {
    res.status(404)
    throw new Error("No feedbacks found")
  }
})
