const Stronghold = require("../models/StrongholdSchema");

//Get all mari items from DB
const getStrongholdItems = async (req, res) => {
  const items = await Stronghold.find({});
  res.status(200).json(items);
};

module.exports = {
  getStrongholdItems,
};
