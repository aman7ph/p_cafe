import getConnection from "../../config/db-pg.js";
import asyncHandler from "express-async-handler";

export const createFeedback = asyncHandler(async (req, res) => {
  const { name, email, comment } = req.body;
  const client = await getConnection();

  try {
    const escapedName = name.replace(/'/g, "''");
    const escapedEmail = email.replace(/'/g, "''");
    const escapedComment = comment.replace(/'/g, "''");

    const query = `
      INSERT INTO feedback (name, email, comment)
      VALUES ($1, $2, $3)
      RETURNING *;
    `;

    const result = await client.query(query, [
      escapedName,
      escapedEmail,
      escapedComment,
    ]);

    const feedback = result.rows[0];

    if (feedback) {
      res.status(201).json({ feedback });
    } else {
      res.status(400);
      throw new Error("Invalid feedback data");
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  } finally {
    client.release();
  }
});
export const getFeedbacks = asyncHandler(async (req, res) => {
  const pageSize = 2;
  const page = Number(req.query.pageNumber) || 1;

  const client = await getConnection();

  try {
    const query = `
      SELECT *
      FROM feedback
      ORDER BY created_at DESC
      LIMIT $1
      OFFSET $2;
    `;
    const values = [pageSize, pageSize * (page - 1)];

    const result = await client.query(query, values);
    const feedbacks = result.rows;

    const totalFeedbacksQuery = "SELECT COUNT(*) FROM feedback";
    const countResult = await client.query(totalFeedbacksQuery);
    const count = countResult.rows[0].count;

    if (feedbacks.length > 0) {
      res.status(200).json({
        status: "success",
        feedbacks,
        pages: Math.ceil(count / pageSize),
        page,
      });
    } else {
      res.status(200).json({
        status: "success",
        message: "No feedbacks found",
        feedbacks: [],
        pages: 0,
        page,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  } finally {
    client.release();
  }
});

export const getFeedbackById = asyncHandler(async (req, res) => {
  const id = req.params.id;

  const client = await getConnection();

  try {
    const query = `SELECT * FROM feedback WHERE feedback_id = $1`;
    const values = [id];

    const result = await client.query(query, values);
    const feedback = result.rows[0];

    if (feedback) {
      res.status(200).json(feedback);
    } else {
      res.status(404).json({ error: "Feedback not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  } finally {
    client.release();
  }
});

export const deleteFeedback = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const client = await getConnection();

  try {
    const query = `DELETE FROM feedback WHERE feedback_id = $1 RETURNING *`;
    const values = [id];

    const result = await client.query(query, values);
    const deletedFeedback = result.rows[0];

    if (deletedFeedback) {
      res.status(200).json({ message: "Feedback deleted" });
    } else {
      res.status(404).json({ error: "Feedback not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  } finally {
    client.release();
  }
});
