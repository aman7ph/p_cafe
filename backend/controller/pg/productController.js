import fs from "fs";
import asyncHandler from "express-async-handler";
import getConnection from "../../config/db-pg.js";
import { fileURLToPath } from "url";
import path from "path";

export const getAllProduct = asyncHandler(async (req, res, next) => {
  const client = await getConnection();
  try {
    const pageSize = 8;
    const page = Number(req.query.pageNumber) || 1;
    let queryText = "SELECT * FROM products WHERE status = true";
    let queryParams = [];

    if (req.query.keyword) {
      queryText += " AND name ILIKE $1";
      queryParams.push(`%${req.query.keyword}%`);
    } else if (req.query.category) {
      queryText += " AND category = $1";
      queryParams.push(req.query.category);
    }

    const { rows } = await client.query({
      text: queryText + ` LIMIT $1 OFFSET $2`,
      values: [...queryParams, pageSize, pageSize * (page - 1)],
    });

    const countResult = await client.query(
      "SELECT COUNT(*) FROM products WHERE status = true"
    );
    const count = parseInt(countResult.rows[0].count);

    res.status(200).json({
      status: "success",
      result: rows.length,
      pages: Math.ceil(count / pageSize),
      page,
      products: rows,
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ status: "error", message: "Internal server error" });
  } finally {
    client.release();
  }
});

export const getProduct = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const client = await getConnection();

  try {
    const queryText = "SELECT * FROM products WHERE id = $1";
    const { rows } = await client.query(queryText, [id]);

    if (rows.length === 0) {
      res.status(404);
      throw new Error("Product not found");
    }

    res.status(200).json({
      status: "success",
      product: rows[0],
    });
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({ status: "error", message: "Internal server error" });
  } finally {
    client.release();
  }
});

export const createProduct = asyncHandler(async (req, res, next) => {
  const { name, price, description, category, image } = req.body;
  const client = await getConnection();

  try {
    const queryText = `
      INSERT INTO products (name, price, description, category, image)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *`;

    const values = [name, Number(price), description, category, image];
    const { rows } = await client.query(queryText, values);

    const createdProduct = rows[0];

    res.status(201).json({
      status: "success",
      product: createdProduct,
    });
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ status: "error", message: "Internal server error" });
  } finally {
    client.release();
  }
});

export const updateProduct = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const client = await getConnection();

  try {
    const { name, price, description, category, image } = req.body;

    const queryText = `
      UPDATE products 
      SET name = $1, price = $2, description = $3, category = $4, image = $5
      WHERE id = $6
      RETURNING *`;

    const values = [name, Number(price), description, category, image, id];
    const { rows } = await client.query(queryText, values);

    if (rows.length === 0) {
      res.status(404);
      throw new Error("Product not found");
    }

    res.status(200).json({
      status: "success",
      product: rows[0],
    });
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ status: "error", message: "Internal server error" });
  } finally {
    client.release();
  }
});

export const deleteProduct = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const client = await getConnection();

  try {
    const { rows } = await client.query(
      "SELECT * FROM products WHERE id = $1",
      [id]
    );
    if (rows.length === 0) {
      res.status(404);
      throw new Error("Product not found");
    }

    const product = rows[0];

    await client.query("DELETE FROM products WHERE id = $1", [id]);

    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const imagePath = path.join(__dirname, "..", "..", product.image);
    await fs.promises.unlink(imagePath);

    console.log("Image deleted successfully");
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ status: "error", message: "Internal server error" });
  } finally {
    client.release();
  }
  res.status(200).json({
    status: "success",
    message: "Product deleted",
  });
});

export const getLandingPageProduct = asyncHandler(async (req, res, next) => {
  const client = await getConnection();

  try {
    const queryText = "SELECT * FROM products ORDER BY created_at DESC LIMIT 4";
    const { rows } = await client.query(queryText);

    res.status(200).json(rows);
  } catch (error) {
    console.error("Error fetching landing page products:", error);
    res.status(500).json({ status: "error", message: "Internal server error" });
  } finally {
    client.release();
  }
});

export const updateProductStatus = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const client = await getConnection();

  try {
    const checkProductQuery = "SELECT * FROM products WHERE id = $1";
    const { rows: existingProductRows } = await client.query(
      checkProductQuery,
      [id]
    );

    if (existingProductRows.length === 0) {
      res.status(404);
      throw new Error("Product not found");
    }

    const existingProduct = existingProductRows[0];

    const newStatus = !existingProduct.status;
    const updateStatusQuery =
      "UPDATE products SET status = $1 WHERE id = $2 RETURNING *";
    const { rows: updatedProductRows } = await client.query(updateStatusQuery, [
      newStatus,
      id,
    ]);

    const updatedProduct = updatedProductRows[0];

    res.status(200).json({
      status: "success",
      product: updatedProduct,
    });
  } catch (error) {
    console.error("Error updating product status:", error);
    res.status(500).json({ status: "error", message: "Internal server error" });
  } finally {
    client.release();
  }
});

export const getAllProductForAdmin = asyncHandler(async (req, res, next) => {
  const pageSize = 8;
  const page = Number(req.query.pageNumber) || 1;
  const client = await getConnection();

  try {
    let queryText = "SELECT * FROM products";
    let queryParams = [];

    if (req.query.keyword) {
      queryText += " WHERE name ILIKE $1 AND status = TRUE";
      queryParams.push(`%${req.query.keyword}%`);
    } else if (req.query.category) {
      queryText += " WHERE category = $1 AND status = TRUE";
      queryParams.push(req.query.category);
    } else {
      queryText += " WHERE status = TRUE";
    }

    const countQueryText = "SELECT COUNT(*) FROM products WHERE status = TRUE";
    const countResult = await client.query(countQueryText);
    const count = parseInt(countResult.rows[0].count);

    const limitOffset = pageSize * (page - 1);
    queryText += ` ORDER BY created_at DESC LIMIT $${
      queryParams.length + 1
    } OFFSET $${queryParams.length + 2}`;
    queryParams.push(pageSize, limitOffset);

    const { rows } = await client.query(queryText, queryParams);

    res.status(200).json({
      status: "success",
      result: rows.length,
      pages: Math.ceil(count / pageSize),
      page,
      products: rows,
    });
  } catch (error) {
    console.error("Error fetching products for admin:", error);
    res.status(500).json({ status: "error", message: "Internal server error" });
  } finally {
    client.release();
  }
});

export const getProductByCategory = asyncHandler(async (req, res, next) => {
  const { category } = req.params;
  const client = await getConnection();

  try {
    const queryText = "SELECT * FROM products WHERE category = $1";
    const { rows } = await client.query(queryText, [category]);

    res.status(200).json({
      status: "success",
      products: rows,
    });
  } catch (error) {
    console.error("Error fetching products by category:", error);
    res.status(500).json({ status: "error", message: "Internal server error" });
  } finally {
    client.release();
  }
});
