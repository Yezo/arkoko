const mongoose = require("mongoose")
const Schema = mongoose.Schema

const sourceSchema = new Schema({
  category: {
    type: String,
    required: true,
  },
  rarity: {
    type: Number,
    required: true,
  },
  obtainedFrom: {
    type: String,
    required: true,
  },
})

const runeSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    imageURL: {
      type: String,
      required: true,
    },
    effect: {
      type: String,
      required: true,
    },
    sources: {
      one: sourceSchema,
      two: sourceSchema,
      three: sourceSchema,
      four: sourceSchema,
      five: sourceSchema,
      six: sourceSchema,
      seven: sourceSchema,
      eight: sourceSchema,
      nine: sourceSchema,
      ten: sourceSchema,
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model("Rune", runeSchema)
