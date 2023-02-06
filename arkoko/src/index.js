const cors = require("cors");
const express = require("express");
const app = express();
const mongoose = require('mongoose');
require('dotenv').config()
const MariShop = require('./models/MariSchema')
const Stronghold = require('./models/StrongholdSchema')
const Engraving = require('./models/EngravingSchema')

const {getMariShopItems} = require('./controllers/mariController')
const {getStrongholdItems} = require('./controllers/strongholdController')
const {getEngravingItems} = require('./controllers/engravingController')


app.use(cors());
app.use(express.json());
app.use('/public/images',express.static(__dirname + '/public/images'));


//Connect to Mongo
mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGO_URI)
.then(()=> {app.listen(process.env.PORT, () => console.log('Connected to Mongo + server is on PORT:', process.env.PORT));})
.catch((error) => {
  console.log(error)
})

app.get('/api/marishop', getMariShopItems)
app.get('/api/stronghold', getStrongholdItems)
app.get('/api/engravings', getEngravingItems)

app.post('/api/marishop', async (req, res) => {
  const {name, bluecrystal, quantity} = req.body
  try {
    const mari = await MariShop.create({name,bluecrystal,quantity})
    res.status(200).json(mari)
  } catch (error){
    res.status(400).json({error:error.message})
  }
})

app.post('/api/stronghold', async (req, res) => {
  const {name, quantity, imgURL, id,craftingTime,craftingCost,strongholdEnergy,strongholdXP, materialOne, materialTwo, materialThree,materialFour} = req.body
  try {
    const strong = await Stronghold.create({name,quantity,imgURL,craftingTime,strongholdEnergy,strongholdXP, craftingCost,id, materialOne, materialTwo, materialThree,materialFour})
    res.status(200).json(strong)
  } catch (error){
    res.status(400).json({error:error.message})
  }
})

app.post('/api/engravings', async (req, res) => {
  const {imageURL, levelOne, levelTwo,levelThree ,engraving, belongsToClass, isClassEngraving} = req.body
  try {
    const engrave = await Engraving.create({engraving, imageURL, levelOne, levelTwo,levelThree,isClassEngraving,belongsToClass})
    res.status(200).json(engrave)
  } catch (error){
    res.status(400).json({error:error.message})
  }
})


