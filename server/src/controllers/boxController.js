const { Store, Box, Cuisine, Stores_Cuisine } = require('../db/models');
require('dotenv').config();

exports.getAllBoxes = async (req, res) => {
  try {
    const allBoxes = await Box.findAll({
      attributes: ['id', 'name', 'descr', 'count', 'price', 'start_date', 'end_date'],
      include: [{
        model: Store,
        attributes: ['name', 'store_img', ]
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
  
  try {
    const cuisine = await Cuisine.findOne({where: {name: type}});

    const filteredBoxes = await Box.findAll({
      include: [{
        model: Store,
        attributes: ['name', 'store_img'],
        required: true,
        include: [{
          model: Cuisine,
          attributes: [],
          required: true,
          where: {
            id: cuisine.id
          },
        }],
      }]
    });

    res.json(filteredBoxes);
  } catch (err) {
    console.log(err)
  }
  res.end();
};
