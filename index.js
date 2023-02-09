const cors = require("cors");
const express = require("express");
const app = express();
const mongoose = require("mongoose");

const MariShop = require("./src/models/MariSchema");
const { getMariShopItems } = require("./src/controllers/GETmariController");
const Stronghold = require("./src/models/StrongholdSchema");
const {
  getStrongholdItems,
} = require("./src/controllers/GETstrongholdController");
const Engraving = require("./src/models/EngravingSchema");
const {
  getEngravingItems,
} = require("./src/controllers/GETengravingController");

// Middleware
require("dotenv").config();
app.use(cors());
app.use(express.json());
app.use("/public/images", express.static(__dirname + "/public/images"));

// Connect to Mongo
mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT || 8080, () =>
      console.log("Connected to Mongo + server is on PORT:", process.env.PORT)
    );
  })
  .catch((error) => {
    console.log(error);
  });

// GET Routes
app.get("/api/marishop", getMariShopItems);
app.get("/api/stronghold", getStrongholdItems);
app.get("/api/engravings", getEngravingItems);

// POST Routes
app.post("/api/marishop", async (req, res) => {
  const { name, bluecrystal, quantity } = req.body;
  try {
    const mari = await MariShop.create({ name, bluecrystal, quantity });
    res.status(200).json(mari);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.post("/api/stronghold", async (req, res) => {
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
  } = req.body;
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
    });
    res.status(200).json(strong);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.post("/api/engravings", async (req, res) => {
  const {
    imageURL,
    levelOne,
    levelTwo,
    levelThree,
    engraving,
    belongsToClass,
    isClassEngraving,
  } = req.body;
  try {
    const engrave = await Engraving.create({
      engraving,
      imageURL,
      levelOne,
      levelTwo,
      levelThree,
      isClassEngraving,
      belongsToClass,
    });
    res.status(200).json(engrave);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = app;
