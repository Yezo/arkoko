const MariShop = require("./src/models/MariSchema")
const Engraving = require("./src//models/EngravingSchema")
const Rune = require("./src/models/RuneSchema")
const Stronghold = require("./src/models/StrongholdSchema")

//GET - engravings
const getEngravingItems = async (req, res) => {
  const items = await Engraving.find({})
  res.status(200).json(items)
}

//POST - engravings
const postEngravingItems = async (req, res) => {
  const { imageURL, levelOne, levelTwo, levelThree, engraving, belongsToClass, isClassEngraving } =
    req.body
  try {
    const engrave = await Engraving.create({
      engraving,
      imageURL,
      levelOne,
      levelTwo,
      levelThree,
      isClassEngraving,
      belongsToClass,
    })
    res.status(201).json(engrave)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

//GET - mari shop
const getMariShopItems = async (req, res) => {
  const items = await MariShop.find({})
  res.status(200).json(items)
}

//POST - mari shop
const postMariShopItems = async (req, res) => {
  const { name, bluecrystal, quantity } = req.body
  try {
    const mari = await MariShop.create({ name, bluecrystal, quantity })
    res.status(201).json(mari)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

//GET - rune items
const getRuneItems = async (req, res) => {
  const items = await Rune.find({})
  res.status(200).json(items)
}

//POST - rune items
const postRuneItems = async (req, res) => {
  const { name, imageURL, rarity, effect, sources } = req.body
  try {
    const rune = await Rune.create({
      name,
      imageURL,
      rarity,
      effect,
      sources,
    })
    res.status(201).json(rune)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

//GET - stronghold items
const getStrongholdItems = async (req, res) => {
  const items = await Stronghold.find({})
  res.status(200).json(items)
}

const postStrongholdItems = async (req, res) => {
  const {
    name,
    quantity,
    imgURL,
    id,
    craftingTime,
    craftingCost,
    strongholdEnergy,
    strongholdXP,
    materialOne,
    materialTwo,
    materialThree,
    materialFour,
  } = req.body
  try {
    const strong = await Stronghold.create({
      name,
      quantity,
      imgURL,
      craftingTime,
      strongholdEnergy,
      strongholdXP,
      craftingCost,
      id,
      materialOne,
      materialTwo,
      materialThree,
      materialFour,
    })
    res.status(201).json(strong)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

module.exports = {
  getMariShopItems,
  postMariShopItems,
  getEngravingItems,
  postEngravingItems,
  getRuneItems,
  postRuneItems,
  getStrongholdItems,
  postStrongholdItems,
}
