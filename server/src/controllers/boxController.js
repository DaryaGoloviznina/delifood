const { Store, Box, Cuisine, Stores_Cuisine } = require('../db/models');
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
      attributes: ['name', 'id']
    });
    res.json(allCuisines);
  } catch (err) {
    console.log(err)
  }
  res.end();
};

exports.getBoxesByCuisine = async (req, res) => {
  const { type } = req.body;
  console.log('valuue=>', type);
  try {
    const cuisine = await Cuisine.findOne({where: {name: type}});

    const storesByCuisine = await Store.findAll({
      attributes: ['id'],
      include: {
        model: Stores_Cuisine,
        attributes: ['store_id', 'cuisine_id'],
      }, 
      where: {
        cuisine_id: cuisine.id 
      }
    });

    console.log('boxes=>>>', storesByCuisine);
    // res.json(boxesByCuisine);
  } catch (err) {
    console.log(err)
  }
  res.end();
};
