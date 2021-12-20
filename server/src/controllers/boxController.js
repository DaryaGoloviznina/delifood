const { Store, Box, Cuisine, Sequelize} = require('../db/models');
const { Op } = require("sequelize");
const { formatToRawSendData } = require('../lib/formatDBData');
require('dotenv').config();

//================ filtering an array of boxes to add only active and non-reserved boxes
const filterActiveBoxes = (boxesArr) => {
  return boxesArr.filter((el) => {
    return el.count !== (el.count_reserved + el.count_bought);
  });
}

//================ setting attributes for future queries
const attributes = [
  'id', 'name', 'descr', 'count', 'price', 'count_reserved', 'count_bought', 'start_date', 'end_date', 
  [Sequelize.col('Store.name'), 'store_name'], 
  [Sequelize.col('Store.store_img'), 'store_img'],
  [Sequelize.col('Store.lon'), 'store_lon'],
  [Sequelize.col('Store.lat'), 'store_lat'],
  [Sequelize.col('Store.country_code'), 'country_code'],
];

//================== getting all non-expired boxes
exports.getAllBoxes = async (req, res) => {
  try {
    const allBoxes = await Box.findAll({
      attributes: attributes,
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

    const activeBoxes = filterActiveBoxes(allBoxes);

    res.json(activeBoxes);
  } catch (err) {
    console.log(err)
  }
  res.end();
};

//==================== getting all cuisines from DB
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

//==================== getting filtered boxes based on 7 possible
exports.getFilteredBoxes = async (req, res) => {
  const { type, price, time } = req.body;

  //------------------getting cuisine's id if cuisine is specified
  let cuisine;
  if (type !== 'Any Cuisine') cuisine = await Cuisine.findOne({where: {name: type}});
  
  try {
    //-------------------filter only by cuisine
    if (price === 'anyPrice' && time === 'anyTime') {
      const filteredByCuisine = await Box.findAll({
        attributes: attributes,
        include: [{
          model: Store,
          attributes: [],
          required: true,
          include: [{
            model: Cuisine,
            attributes: [],
            required: true,
            where: {
              id: cuisine.id
            },
          }],
        }],
        where: {
          end_date: {
            [Op.gt]: new Date()
          }
        },
      });

      const activeFilteredBoxes = filterActiveBoxes(filteredByCuisine);
      res.json(activeFilteredBoxes).end();
    }

    //--------------------filter only by price
    if (type === 'Any Cuisine' && time === 'anyTime') {
      const filteredByPrice = await Box.findAll({
        attributes: attributes,
        include: [{
          model: Store,
          attributes: [],
          required: true,
        }],
        where: {
          end_date: {
            [Op.gt]: new Date()
          }
        },
        order: [['price', price]]
      });

      const activeFilteredBoxes = filterActiveBoxes(filteredByPrice);
      res.json(activeFilteredBoxes).end();
    }

    //---------------------filter only by time
    if (type === 'Any Cuisine' && price === 'anyPrice') {
      const filteredByTime = await Box.findAll({
        attributes: attributes,
        include: [{
          model: Store,
          attributes: [],
          required: true,
        }],
        where: {
          end_date: {
            [Op.gte]: time
          },
          start_date: {
            [Op.lte]: time
          }
        }
      });

      const activeFilteredBoxes = filterActiveBoxes(filteredByTime);
      res.json(activeFilteredBoxes).end();
    }

    //---------------------filter by cuisine AND price
    if (type !== 'Any Cuisine' && price !== 'anyPrice' && time === 'anyTime') {
      const filteredByCuisineAndPrice = await Box.findAll({
        attributes: attributes,
        include: [{
          model: Store,
          attributes: [],
          required: true,
          include: [{
            model: Cuisine,
            attributes: [],
            required: true,
            where: {
              id: cuisine.id
            },
          }],
        }],
        where: {
          end_date: {
            [Op.gt]: new Date()
          }
        },
        order: [['price', price]]
      });

      const activeFilteredBoxes = filterActiveBoxes(filteredByCuisineAndPrice);
      res.json(activeFilteredBoxes).end();
    }

    //---------------------filter by cuisine AND time
    if (type !== 'Any Cuisine' && time !== 'anyTime' && price === 'anyPrice') {
      const filteredByCuisineAndTime = await Box.findAll({
        attributes: attributes,
        include: [{
          model: Store,
          attributes: [],
          required: true,
          include: [{
            model: Cuisine,
            attributes: [],
            required: true,
            where: {
              id: cuisine.id
            },
          }],
        }],
        where: {
          end_date: {
            [Op.gte]: time
          },
          start_date: {
            [Op.lte]: time
          }
        }
      });

      const activeFilteredBoxes = filterActiveBoxes(filteredByCuisineAndTime);
      res.json(activeFilteredBoxes).end();
    }

    //---------------------filter by price AND time
    if (price !== 'anyPrice' && time !== 'anyTime' && type === 'Any Cuisine') {
      const filteredByPriceAndTime = await Box.findAll({
        attributes: attributes,
        include: [{
          model: Store,
          attributes: [],
          required: true,
        }],
        where: {
          end_date: {
            [Op.gte]: time
          },
          start_date: {
            [Op.lte]: time
          }
        },
        order: [['price', price]]
      });

      const activeFilteredBoxes = filterActiveBoxes(filteredByPriceAndTime);
      res.json(activeFilteredBoxes).end();
    }

    //---------------------filter by all three options 
    if (
      type !== 'Any Cuisine' 
      && price !== 'anyPrice' 
      && time !== 'anyTime' ) {
      const filteredBoxes = await Box.findAll({
        attributes: attributes,
        include: [{
          model: Store,
          attributes: [],
          required: true,
          include: [{
            model: Cuisine,
            attributes: [],
            required: true,
            where: {
              id: cuisine.id
            },
          }],
        }],
        where: {
          end_date: {
            [Op.gte]: time
          },
          start_date: {
            [Op.lte]: time
          }
        },
        order: [['price', price]]
      });

      const activeFilteredBoxes = filterActiveBoxes(filteredBoxes);
      res.json(activeFilteredBoxes).end();
    }
  } catch (error) {
    console.log(error)
  }
  res.end();
};

exports.getSearchedBoxes = async (req, res) => {
  const {query} = req.body;

  const searchedBoxes = await Box.findAll(
    {
      attributes: attributes,
      include: [{
        model: Store,
        attributes: [],
        where: {
          name: Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('Store.name')), 'LIKE', '%' + query.toLowerCase() + '%'),
        },
      }],
    }
  );

  res.json(formatToRawSendData(searchedBoxes))
}