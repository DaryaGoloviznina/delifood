const { Order, Box, Sequelize, Store, Client } = require('../db/models');
const { Op } = require("sequelize");
const randStr = require('randomstring');
const { sendNotice } = require('../lib/nodemailer');
const { createStrDateFromDB, convertObjTimetoStrTime } = require('../lib/convertTimeFunctions');

exports.addNewOrder = async (req, res) => {
  try {
    let box = await Box.findByPk(req.body.box_id);
    if ((box.dataValues.count - box.dataValues.count_reserved - box.dataValues.count_bought) < req.body.count_box){
      res.status(403).end()
    } else {
      let code = randStr.generate(6);
      await Order.create({
          box_id: req.body.box_id,
          client_id: req.body.client_id,
          order_count: req.body.count_box,
          order_code: code
      });
      box.count_reserved += req.body.count_box;
      box.save();
      let user = await Client.findByPk(req.body.client_id)
      let store = await Store.findByPk(box.dataValues.store_id)
      
      let text = `<p>Hello, ${user.dataValues.name}</p>
                  <p> The secret box from ${store.dataValues.name} has been booked successfully!</p>
                  <br>
                  <p> Details:</p>
                  <p> Price: ${req.body.count_box*box.dataValues.price}$</p>
                  <p>Address: ${store.dataValues.address}</p>
                  <p>Date: ${createStrDateFromDB(box.dataValues.start_date)}</p>
                  <p>Time: ${convertObjTimetoStrTime(box.dataValues.start_date)}-${convertObjTimetoStrTime(box.dataValues.end_date)}</p>
                  <p> Order code: ${code}</p>`
      sendNotice(user.dataValues.email, text)
      res.status(201).end();
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
          ['id', 'box_id', 'client_id', 'order_count', 'order_code', 'picked_up', 'createdAt',
            [Sequelize.col('Box.name'), 'box_name'],
            [Sequelize.col('Box.price'), 'box_price'],
            [Sequelize.col('Box.start_date'), 'box_start_date'],
            [Sequelize.col('Box.end_date'), 'box_end_date'],
          ],
        include: [{ model: Box, attributes: [], include: [{ model: Store, attributes: ['name', 'address', 'phone', 'store_img'] }] }],
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
          ['id', 'box_id', 'client_id', 'order_count', 'order_code', 'picked_up', 'createdAt',
            [Sequelize.col('Box.name'), 'box_name'],
            [Sequelize.col('Box.price'), 'box_price'],
            [Sequelize.col('Box.start_date'), 'box_start_date'],
            [Sequelize.col('Box.end_date'), 'box_end_date'],
          ],
        include: [{ model: Box, attributes: ['end_date'], include: [{ model: Store, attributes: ['name', 'address', 'phone', 'store_img'] }] }],
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
          ['id', 'box_id', 'client_id', 'order_count', 'order_code', 'picked_up', 'createdAt',
            [Sequelize.col('Box.name'), 'box_name'],
            [Sequelize.col('Box.price'), 'box_price'],
            [Sequelize.col('Box.start_date'), 'box_start_date'],
            [Sequelize.col('Box.end_date'), 'box_end_date'],
          ],
        include: [{ model: Box, attributes: ['end_date'], include: [{ model: Store, attributes: ['name', 'address', 'phone', 'store_img'] }] }],
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

exports.deleteClientOrder = async (req, res) => {
  try {
    if (req.body.status === 'Pending Pick Up'){
    const delOrder = await Order.findByPk(req.body.id);
    const corBox = await Box.findByPk(delOrder.dataValues.box_id);
    corBox.count_reserved -= delOrder.order_count;
    await corBox.save()
    await Order.destroy({
      where: {
        id: req.body.id,
      }
    })
    } else {
      const delOrder = await Order.findByPk(req.body.id);
      delOrder.client_visibility = false;
      await delOrder.save();
    }
    res.end()
  } catch (error) {
    console.log(error);
  }
};
