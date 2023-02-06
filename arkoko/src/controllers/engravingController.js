const Engraving = require('../models/EngravingSchema')

//Get all mari items from DB
const getEngravingItems = async (req, res) => {
    const items = await Engraving.find({})
    res.status(200).json(items);
}

module.exports = {
    getEngravingItems
}