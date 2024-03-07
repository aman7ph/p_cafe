import mongoose from "mongoose"

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
      default: 0,
    },

    remainingNumber: {
      type: Number,
      default: 0,
      required: true,
      min: 0,
    },

    addedNumber: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
)

const Material = model("Material", materialSchema)
export default Material
