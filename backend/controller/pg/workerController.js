import getConnection from "../../config/db-pg.js";
import asyncHandler from "express-async-handler";

const getAllWorkers = asyncHandler(async (req, res, next) => {
  const client = await getConnection();
  try {
    const query = `
      SELECT * FROM workers;
    `;
    const result = await client.query(query);

    if (result.rows.length === 0) {
      res.status(404);
      throw new Error("Workers not found");
    }

    res.status(200).json({
      status: "success",
      workers: result.rows,
    });
  } catch (error) {
    res.status(500);
    throw new Error("Internal Server Error");
  } finally {
    client.release();
  }
});

const getWorkerById = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const client = await getConnection();
  try {
    const query = `
      SELECT * FROM workers WHERE id = $1;
    `;
    const result = await client.query(query, [id]);

    if (result.rows.length === 0) {
      res.status(404);
      throw new Error("Worker not found");
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    res.status(500);
    throw new Error("Internal Server Error");
  } finally {
    client.release();
  }
});

const addWorker = asyncHandler(async (req, res, next) => {
  const { name, position, salary, address, phoneNumber } = req.body;
  const client = await getConnection();
  try {
    await client.connect();

    const query = `
      INSERT INTO workers (name, position, salary, address, phone_number) 
      VALUES ($1, $2, $3, $4, $5) 
      RETURNING *
    `;

    const values = [name, position, salary, address, phoneNumber];
    const result = await client.query(query, values);

    if (result.rows.length === 0) {
      res.status(404);
      throw new Error("Worker is not added");
    }

    res.status(201).json({
      status: "success",
      worker: result.rows[0],
    });
  } catch (error) {
    next(error);
  } finally {
    await client.end();
  }
});

const updateWorker = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { name, position, salary, address, phoneNumber } = req.body;
  const client = await getConnection();

  try {
    await client.connect();

    const query = `
      UPDATE workers 
      SET 
        name = COALESCE($1, name), 
        position = COALESCE($2, position), 
        salary = COALESCE($3, salary), 
        address = COALESCE($4, address), 
        phone_number = COALESCE($5, phone_number)
      WHERE worker_id = $6
      RETURNING *
    `;

    const values = [name, position, salary, address, phoneNumber, id];
    const result = await client.query(query, values);

    if (result.rows.length === 0) {
      res.status(404);
      throw new Error("Worker not found");
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    next(error);
  } finally {
    await client.end();
  }
});

const deleteWorker = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const client = await getConnection();
  try {
    await client.connect();

    const query = "DELETE FROM workers WHERE worker_id = $1";
    const result = await client.query(query, [id]);

    if (result.rowCount === 0) {
      res.status(404);
      throw new Error("Worker not found");
    }

    res.json({ message: "Worker removed" });
  } catch (error) {
    next(error);
  } finally {
    await client.end();
  }
});

const addNegativeBalance = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { reason, negativeBalance } = req.body;
  const client = await getConnection();
  try {
    const checkQuery = `
      SELECT * FROM workers WHERE id = $1;
    `;
    const checkResult = await client.query(checkQuery, [id]);

    if (checkResult.rows.length === 0) {
      res.status(404);
      throw new Error("Worker not found");
    }

    const updateQuery = `
      UPDATE workers
      SET negative_balance = negative_balance + $1,
          balance_history = array_append(balance_history, $2)
      WHERE id = $3
      RETURNING *;
    `;
    const updateResult = await client.query(updateQuery, [
      negativeBalance,
      `+${negativeBalance} -${reason || "added"}`,
      id,
    ]);

    const updatedWorker = updateResult.rows[0];
    res.status(200).json({
      status: "success",
      updatedWorker,
    });
  } catch (error) {
    res.status(500);
    throw new Error("Internal Server Error");
  } finally {
    client.release();
  }
});

const subtractNegativeBalance = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { reason, negativeBalance } = req.body;
  const client = await getConnection();

  try {
    const checkQuery = `
      SELECT * FROM worker WHERE id = $1;
    `;
    const checkResult = await client.query(checkQuery, [id]);

    if (checkResult.rows.length === 0) {
      res.status(404);
      throw new Error("Worker not found");
    }

    const updateQuery = `
      UPDATE worker
      SET negative_balance = negative_balance - $1,
          balance_history = array_append(balance_history, $2)
      WHERE id = $3
      RETURNING *;
    `;
    const updateResult = await client.query(updateQuery, [
      negativeBalance,
      `-${negativeBalance}- ${reason || "subtracted"}`,
      id,
    ]);

    const updatedWorker = updateResult.rows[0];
    res.status(200).json({
      status: "success",
      updatedWorker,
    });
  } catch (error) {
    res.status(500);
    throw new Error("Internal Server Error");
  } finally {
    client.release();
  }
});

export {
  getAllWorkers,
  getWorkerById,
  addWorker,
  updateWorker,
  deleteWorker,
  addNegativeBalance,
  subtractNegativeBalance,
};
