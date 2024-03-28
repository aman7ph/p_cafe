import Material from "../../models/materialModel.js";
import asyncHandler from "express-async-handler";

export const getAllMaterials = asyncHandler(async (req, res, next) => {
  const pageSize = 8;
  const page = Number(req.query.pageNumber) || 1;
  const client = await getConnection();

  try {
    const countQuery = `
      SELECT COUNT(*) AS total FROM materials;
    `;
    const countResult = await client.query(countQuery);
    const count = countResult.rows[0].total;

    const offset = (page - 1) * pageSize;
    const query = `
      SELECT * FROM materials
      ORDER BY created_at DESC
      LIMIT $1 OFFSET $2;
    `;
    const result = await client.query(query, [pageSize, offset]);
    const materials = result.rows;

    res.status(200).json({
      status: "success",
      materials,
      pages: Math.ceil(count / pageSize),
      page,
    });
  } catch (error) {
    res.status(500);
    throw new Error("Internal Server Error");
  } finally {
    client.release();
  }
});
export const createMaterial = asyncHandler(async (req, res, next) => {
  const { name, initialNumber } = req.body;
  const client = await getConnection();
  try {
    const query = `
      INSERT INTO materials (name, initial_number, remaining_number)
      VALUES ($1, $2, $3)
      RETURNING *;
    `;
    const result = await client.query(query, [
      name,
      initialNumber,
      initialNumber,
    ]);
    const material = result.rows[0];

    res.status(201).json({
      status: "success",
      material,
    });
  } catch (error) {
    res.status(400);
    throw new Error("Invalid material data");
  } finally {
    client.release();
  }
});

export const deleteMaterialById = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const client = await getConnection();
  try {
    const deleteQuery = `
      DELETE FROM materials
      WHERE id = $1
      RETURNING *;
    `;
    const result = await client.query(deleteQuery, [id]);
    const deletedMaterial = result.rows[0];

    if (!deletedMaterial) {
      res.status(404);
      throw new Error("Material not found");
    }

    res.status(200).json({
      status: "success",
      message: "Material deleted successfully",
    });
  } catch (error) {
    res.status(404);
    throw new Error("Material not found");
  } finally {
    client.release();
  }
});
export const getMaterialById = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const client = await getConnection();
  try {
    const query = `
      SELECT * FROM materials
      WHERE id = $1;
    `;
    const result = await client.query(query, [id]);
    const material = result.rows[0];

    if (!material) {
      res.status(404);
      throw new Error("Material not found");
    }

    res.status(200).json({
      status: "success",
      material,
    });
  } catch (error) {
    res.status(404);
    throw new Error("Material not found");
  } finally {
    client.release();
  }
});

export const addMaterials = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { addedNumber } = req.body;
  const client = await getConnection();
  try {
    const checkQuery = `
      SELECT * FROM materials WHERE id = $1;
    `;
    const checkResult = await client.query(checkQuery, [id]);

    if (checkResult.rows.length === 0) {
      res.status(404);
      throw new Error("Material not found");
    }

    const updateQuery = `
      UPDATE materials
      SET added_number = added_number + $1,
          remaining_number = remaining_number + $1
      WHERE id = $2
      RETURNING *;
    `;
    const updateResult = await client.query(updateQuery, [addedNumber, id]);

    const addedMaterials = updateResult.rows[0];
    res.status(200).json({
      status: "success",
      addedMaterials,
    });
  } catch (error) {
    res.status(500);
    throw new Error("Internal Server Error");
  } finally {
    client.release();
  }
});

export const subtractMaterials = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { damagedNumber } = req.body;
  const client = await getConnection();
  try {
    const checkQuery = `
      SELECT * FROM materials WHERE id = $1;
    `;
    const checkResult = await client.query(checkQuery, [id]);

    if (checkResult.rows.length === 0) {
      res.status(404);
      throw new Error("Material not found");
    }

    const updateQuery = `
      UPDATE materials
      SET damaged_number = damaged_number + $1,
          remaining_number = GREATEST(remaining_number - $1, 0)
      WHERE id = $2
      RETURNING *;
    `;
    const updateResult = await client.query(updateQuery, [damagedNumber, id]);

    const subtractedMaterials = updateResult.rows[0];
    res.status(200).json({
      status: "success",
      subtractedMaterials,
    });
  } catch (error) {
    res.status(500);
    throw new Error("Internal Server Error");
  } finally {
    client.release();
  }
});
