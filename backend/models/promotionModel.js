import mongoose from "mongoose"

const promotionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 30,
    },

    image: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

const Promotion = mongoose.model("Promotion", promotionSchema)
export default Promotion
