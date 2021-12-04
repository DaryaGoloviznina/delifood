const { Store, Box, Cuisine } = require('../db/models');
require('dotenv').config();

exports.getAllBoxes = async (req, res) => {
  try {
    const allBoxes = await Box.findAll({
      attributes: ['name', 'descr', 'count', 'price', 'start_date', 'end_date'],
      include: [{
        model: Store,
        attributes: ['name', 'store_img']
      }]
    });
    res.json(allBoxes);
  } catch (err) {
    console.log(err)
  }
  res.end();
};

exports.getAllCuisines = async (req, res) => {
  try {
    const allCuisines = await Cuisine.findAll({
      attributes: ['name']
    });
    res.json(allCuisines);
  } catch (err) {
    console.log(err)
  }
  res.end();
};
