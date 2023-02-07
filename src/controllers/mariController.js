const MariShop = require('../models/MariSchema')

//Get all mari items from DB
const getMariShopItems = async (req, res) => {
    const items = await MariShop.find({})
    res.status(200).json(items);
}

module.exports = {
    getMariShopItems
}