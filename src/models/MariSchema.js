const mongoose = require("mongoose")
const Schema = mongoose.Schema

const mariSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    bluecrystal: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model("MariShop", mariSchema)
