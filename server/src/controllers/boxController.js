const { Store, Box, Cuisine, Sequelize} = require('../db/models');
const { Op } = require("sequelize");
require('dotenv').config();

exports.getAllBoxes = async (req, res) => {
  try {
    const allBoxes = await Box.findAll({
      attributes: ['id', 'name', 'descr', 'count', 'price', 'count_reserved', 'count_bought', 'start_date', 'end_date', 
      [Sequelize.col('Store.name'), 'store_name'], 
      [Sequelize.col('Store.store_img'), 'store_img'],
      [Sequelize.col('Store.lon'), 'store_lon'],
      [Sequelize.col('Store.lat'), 'store_lat']],
      include: [{
        model: Store,
        attributes: []
      }],
      where: {
        end_date: {
          [Op.gt]: new Date()
        }
      },
    }, {raw: true});

    const activeBoxes = allBoxes.filter((el) => {
      return el.count !== (el.count_reserved + el.count_bought);
    });

    console.log(activeBoxes);

    res.json(activeBoxes);
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
