import fs from "fs";
import getConnection from "../../config/db-pg.js";
import asyncHandler from "express-async-handler";

import { fileURLToPath } from "url";
import path from "path";

export const getAllPromotion = asyncHandler(async (req, res, next) => {
  const client = await getConnection();
  try {
    const query = "SELECT * FROM promotions";
    const result = await client.query(query);
    const promotions = result.rows;

    if (promotions.length === 0) {
      res.status(404);
      throw new Error("Promotions not found");
    }

    res.status(200).json({
      status: "success",
      promotions,
    });
  } catch (error) {
    console.error("Error geting All Promotion:", error);
    res.status(500).json({ status: "error", message: "Internal server error" });
  } finally {
    client.release();
  }
});

export const getPromotion = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const client = await getConnection();
  try {
    const query = "SELECT * FROM promotions WHERE promotion_id = $1";
    const result = await client.query(query, [id]);
    const promotion = result.rows[0];

    if (!promotion) {
      res.status(404);
      throw new Error("Promotion not found");
    }

    res.status(200).json({
      status: "success",
      promotion,
    });
  } catch (error) {
    console.error("Error geting a Promotion:", error);
    res.status(500).json({ status: "error", message: "Internal server error" });
  } finally {
    client.release();
  }
});

export const updatePromotion = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const client = await getConnection();
  try {
    const findQuery = "SELECT * FROM promotions WHERE promotion_id = $1";
    const findResult = await client.query(findQuery, [id]);
    const promotion = findResult.rows[0];

    if (!promotion) {
      res.status(404);
      throw new Error("Promotion not found");
    }

    const { name, image } = req.body;
    promotion.name = name || promotion.name;
    promotion.image = image || promotion.image;

    const updateQuery =
      "UPDATE promotions SET name = $1, image = $2 WHERE promotion_id = $3 RETURNING *";
    const updateResult = await client.query(updateQuery, [
      promotion.name,
      promotion.image,
      id,
    ]);
    const updatedPromotion = updateResult.rows[0];

    res.status(200).json({
      status: "success",
      updatedPromotion,
    });
  } catch (error) {
    console.error("Error updating a Promotion:", error);
    res.status(500).json({ status: "error", message: "Internal server error" });
  } finally {
    client.release();
  }
});

export const createPromotion = asyncHandler(async (req, res, next) => {
  const { name, image } = req.body;
  const client = await getConnection();
  try {
    const insertQuery =
      "INSERT INTO promotions (name, image) VALUES ($1, $2) RETURNING *";
    const insertResult = await client.query(insertQuery, [name, image]);
    const newPromotion = insertResult.rows[0];

    res.status(201).json({
      status: "success",
      promotion: newPromotion,
    });
  } catch (error) {
    console.error("Error creating a Promotion:", error);
    res.status(500).json({ status: "error", message: "Internal server error" });
  } finally {
    client.release();
  }
});
export const deletePromotion = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const client = await getConnection();
  try {
    const findQuery = "SELECT * FROM promotions WHERE promotion_id = $1";
    const findResult = await client.query(findQuery, [id]);
    const promotion = findResult.rows[0];

    if (!promotion) {
      res.status(404);
      throw new Error("Promotion not found");
    }

    const deleteQuery = "DELETE FROM promotions WHERE promotion_id = $1";
    await client.query(deleteQuery, [id]);

    // const imagePath = path.join(__dirname, "..", "uploads", promotion.image)
    //console.log(imagePath)

    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const imagePath = path.join(__dirname, "..", "..", promotion.image);
    await fs.promises.unlink(imagePath);

    console.log("Image deleted successfully");

    res.status(200).json({
      status: "success",
      message: "Promotion deleted successfully",
    });
  } catch (err) {
    console.error(
      "Error deleating a Promotion or Error while deleting image:",
      err
    );
    res.status(500).json({ status: "error", message: "Internal server error" });
  } finally {
    client.release();
  }
});
