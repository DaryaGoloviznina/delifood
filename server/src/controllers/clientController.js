const { Order, Box, Sequelize, Store } = require('../db/models');
const { Op } = require("sequelize");
const randStr = require('randomstring');

exports.addNewOrder = async (req, res) => {
  try {
    console.log('ID BOX', req.body.box_id)
    console.log('ID CLIENT', req.body.client_id)
    let box = await Box.findByPk(req.body.box_id);
    console.log(box.dataValues)
    console.log(box.dataValues.count === (box.dataValues.count_reserved + box.dataValues.count_bought))
    if (box.dataValues.count === (box.dataValues.count_reserved + box.dataValues.count_bought)){
      res.json('out')
    } else {
      await Order.create({
          box_id: req.body.box_id,
          client_id: req.body.client_id,
          order_code: randStr.generate(6)
      });
      box.count_reserved += 1;
      box.save();
      res.json('ok')
    } 
   
  } catch (error) {
    console.log(error);
  }
};

exports.getClientOrders = async (req, res) => {
  try {
    console.log('PARAMS', req.params.id)
    console.log('USER', req.body.id)
    if (req.params.id === 'all'){
      const allOrders = await Order.findAll({
        attributes:
          ['id', 'box_id', 'client_id', 'order_code', 'picked_up', 'createdAt',
            [Sequelize.col('Box.name'), 'box_name'],
            [Sequelize.col('Box.price'), 'box_price'],
            [Sequelize.col('Box.start_date'), 'box_start_date'],
            [Sequelize.col('Box.end_date'), 'box_end_date'],
          ],
        include: [{ model: Box, attributes: [], include: [{ model: Store, attributes: ['name', 'address', 'phone'] }] }],
        where: { 
          client_id: req.body.id,
          client_visibility: true
       },
        order: [
          ['id', 'DESC'],
      ],
        raw: true,
      });
      res.json(allOrders)
    } else if (req.params.id === 'active') {
      const activeOrders = await Order.findAll({
        attributes:
          ['id', 'box_id', 'client_id', 'order_code', 'picked_up', 'createdAt',
            [Sequelize.col('Box.name'), 'box_name'],
            [Sequelize.col('Box.price'), 'box_price'],
            [Sequelize.col('Box.start_date'), 'box_start_date'],
            [Sequelize.col('Box.end_date'), 'box_end_date'],
          ],
        include: [{ model: Box, attributes: ['end_date'], include: [{ model: Store, attributes: ['name', 'address', 'phone'] }] }],
        where: { 
          client_id: req.body.id,
          client_visibility: true,
          picked_up: false,
          '$Box.end_date$': {
            [Op.gt]: new Date()
          },
       },
        order: [
          ['id', 'DESC'],
      ],
        raw: true,
      });
      res.json(activeOrders)
    } else {
      const inactiveOrders = await Order.findAll({
        attributes:
          ['id', 'box_id', 'client_id', 'order_code', 'picked_up', 'createdAt',
            [Sequelize.col('Box.name'), 'box_name'],
            [Sequelize.col('Box.price'), 'box_price'],
            [Sequelize.col('Box.start_date'), 'box_start_date'],
            [Sequelize.col('Box.end_date'), 'box_end_date'],
          ],
        include: [{ model: Box, attributes: ['end_date'], include: [{ model: Store, attributes: ['name', 'address', 'phone'] }] }],
        where: { 
          client_id: req.body.id,
          client_visibility: true,
          [Op.or]: [{ [Op.and]: [{ '$Box.end_date$': {
            [Op.lt]: new Date()
          } }, { picked_up: false }] }, { picked_up: true }]
       },
        order: [
          ['id', 'DESC'],
      ],
        raw: true,
      });
      res.json(inactiveOrders)
    }
    
  } catch (error) {
    console.log(error);
  }
};
