const mongoose = require("mongoose")

const { Schema, model } = mongoose

const materialSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    initialNumber: {
      type: Number,
      required: true,
      min: 0,
    },
    damagedNumber: {
      type: Number,
      required: true,
      min: 0,
      validate: {
        validator: (value) => value <= this.initialNumber,
        message: "Damaged number cannot exceed initial number",
      },
    },
    // Calculate remaining number dynamically on retrieval
    remainingNumber: {
      type: Number,
      required: true,
      min: 0,
    },
    // Calculate total number dynamically on retrieval
    totalNumber: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  {
    timestamps: true,
  }
)

const Material = model("Material", materialSchema)
export default Material
