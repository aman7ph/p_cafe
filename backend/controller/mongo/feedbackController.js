import Feedback from "../../models/feedbackModel.js";
import asyncHandler from "express-async-handler";

export const createFeedback = asyncHandler(async (req, res) => {
  const { name, email, comment } = req.body;
  const feedback = await Feedback.create({
    name,
    email,
    comment,
  });
  if (feedback) {
    console.log(feedback);
    res.status(201).json({ feedback: feedback });
  } else {
    res.status(400);
    throw new Error("Invalid feedback data");
  }
});
export const getFeedbacks = asyncHandler(async (req, res) => {
  const pageSize = 2;
  const page = Number(req.query.pageNumber) || 1;
  const count = await Feedback.countDocuments({});
  const feedbacks = await Feedback.find({})
    .limit(pageSize)
    .skip(pageSize * (page - 1))
    .sort({ createdAt: -1 });
  if (feedbacks) {
    res.status(200).json({
      status: "success",
      feedbacks,
      pages: Math.ceil(count / pageSize),
      page,
    });
  } else {
    res.status(404);
    throw new Error("No feedbacks found");
  }
});

export const getFeedbackByid = asyncHandler(async (req, res) => {
  const feedback = await Feedback.findById(req.params.id);
  if (feedback) {
    res.status(200).json(feedback);
  } else {
    res.status(404);
    throw new Error("Feedback not found");
  }
});

export const deleteFeedback = asyncHandler(async (req, res) => {
  const feedback = await Feedback.findById(req.params.id);
  if (feedback) {
    await feedback.remove();
    res.json({ message: "Feedback removed" });
  } else {
    res.status(404);
    throw new Error("Feedback not found");
  }
});
