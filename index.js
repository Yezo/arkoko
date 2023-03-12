const cors = require("cors")
const express = require("express")
const app = express()
const mongoose = require("mongoose")

const {
  getMariShopItems,
  getEngravingItems,
  getRuneItems,
  getStrongholdItems,
  postMariShopItems,
  postEngravingItems,
  postRuneItems,
  postStrongholdItems,
} = require("./database")

// Middleware
require("dotenv").config()
app.use(cors())
app.use(express.json())
app.use("/public/images", express.static(__dirname + "/public/images"))

// Connect to Mongo
mongoose.set("strictQuery", false)
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT || 8080, () =>
      console.log("Connected to Mongo + server is on PORT:", process.env.PORT)
    )
  })
  .catch((error) => {
    console.log(error)
  })

// GET + POST Routes for MARI'S SHOP
app.get("/api/marishop", getMariShopItems)
app.post("/api/marishop", postMariShopItems)

// GET + POST Routes for STRONGHOLD ITEMS
app.get("/api/stronghold", getStrongholdItems)
app.post("/api/stronghold", postStrongholdItems)

// GET + POST Routes for ENGRAVINGS
app.get("/api/engravings", getEngravingItems)
app.post("/api/engravings", postEngravingItems)

// GET + POST Routes for RUNES
app.get("/api/runes", getRuneItems)
app.post("/api/runes", postRuneItems)
