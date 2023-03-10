const Rune = require("../models/RuneSchema")

//Get all runes from DB
const getRuneItems = async (req, res) => {
  const items = await Rune.find({})
  res.status(200).json(items)
}

module.exports = {
  getRuneItems,
}
