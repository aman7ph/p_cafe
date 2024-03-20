import mongoose from "mongoose"

const { Schema, model } = mongoose

const workerSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  possition: {
    type: String,
    required: true,
  },
  salary: {
    type: Number,
    required: true,
  },
  negativeBalance: {
    type: Number,
    default: 0,
    min: 0,
  },
  address: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
})

const Worker = model("Worker", workerSchema)
export default Worker
