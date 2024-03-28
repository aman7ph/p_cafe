import Worker from "../../models/workersModel.js";
import asyncHandler from "express-async-handler";

const getAllWorkers = asyncHandler(async (req, res, next) => {
  const workers = await Worker.find();

  if (!workers) {
    res.status(404);
    throw new Error("Workers not found");
  }

  res.status(200).json({
    status: "success",
    workers,
  });
});

const getWorkerById = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const worker = await Worker.findById(id);
  if (!worker) {
    res.status(404);
    throw new Error("Worker not found");
  }
  res.status(200).json(worker);
});

const addWorker = asyncHandler(async (req, res, next) => {
  const { name, possition, salary, address, phoneNumber } = req.body;

  const worker = await Worker.create({
    name,
    possition,
    salary,
    address,
    phoneNumber,
  });
  if (!worker) {
    res.status(404);
    throw new Error("Worker is not added");
  }
  res.status(201).json({
    status: "success",
    worker,
  });
});

const updateWorker = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const worker = await Worker.findById(id);

  if (!worker) {
    res.status(404);
    throw new Error("Worker not found");
  }

  worker.name = req.body.name || worker.name;
  worker.possition = req.body.possition || worker.possition;
  worker.salary = req.body.salary || worker.salary;
  worker.address = req.body.address || worker.address;
  worker.phoneNumber = req.body.phoneNumber || worker.phoneNumber;

  const updatedWorker = await worker.save();

  res.status(200).json(updatedWorker);
});

const deleteWorker = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const worker = await Worker.findById(id);
  if (!worker) {
    res.status(404);
    throw new Error("Worker not found");
  }
  await Worker.deleteOne({ _id: id });
  res.json({ message: "Worker removed" });
});

const addNegativeBalance = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { reason } = req.body;

  const worker = await Worker.findById(id);
  if (!worker) {
    res.status(404);
    throw new Error("Worker not found");
  }
  worker.negativeBalance = worker.negativeBalance + req.body.negativeBalance;
  worker.balanceHistory.push(
    `+${req.body.negativeBalance} -${reason || "added"}`
  );
  const updatedWorker = await worker.save();
  res.status(200).json({
    status: "success",
    updatedWorker,
  });
});

const subtractNegativeBalance = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { reason } = req.body;
  const worker = await Worker.findById(id);
  if (!worker) {
    res.status(404);
    throw new Error("Worker not found");
  }
  worker.negativeBalance = worker.negativeBalance - req.body.negativeBalance;
  worker.balanceHistory.push(
    `-${req.body.negativeBalance}- ${reason || "substracted"}`
  );
  const updatedWorker = await worker.save();
  res.status(200).json({
    status: "success",
    updatedWorker,
  });
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
