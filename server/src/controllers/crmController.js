const { Box, Order, Client, Sequelize } = require('../db/models');
const { Op } = require("sequelize");

exports.addNewBox = async (req, res) => {
  try {
    const newBox = await Box.create({
      name: req.body.name,
      count: req.body.count,
      price: req.body.price,
      start_date: req.body.start_date,
      end_date: req.body.end_date,
      store_id: req.body.store_id,
      descr: req.body.descr
    });
    res.json(newBox)
  } catch (error) {
    console.log(error);
  }
};

exports.getActiveBoxes = async (req, res) => { 

  try {
    if (req.params.id === 'active') { // active boxes or non-expired boxes
      const activeBoxes = await Box.findAll({
      where: {
        end_date: {
          [Op.gt]: new Date()
        },
        store_id: req.body.id
        },
      order: [
        ['id', 'DESC'],
    ],
      raw: true
    });

    res.json(activeBoxes)
    } else if (req.params.id === 'picked') { // picked up boxes and expired
      const pickedBoxes = await Box.findAll({
        where: {
          end_date: {
            [Op.lt]: new Date()
          },
          count: {
          [Op.col]: 'Box.count_bought'
        },
        store_id: req.body.id,
        rest_visibility: true,
          },
        order: [
          ['id', 'DESC'],
      ],
        raw: true
      });
      res.json(pickedBoxes)
    } else {
      const expiredBoxes = await Box.findAll({ // это боксы, у которых вышло время и которые не раскупили
        where: {
          end_date: {
            [Op.lt]: new Date()
          },
          [Op.not]: {count: {[Op.col]: 'Box.count_bought'}},
          rest_visibility: true,
          store_id: req.body.id
          },
        order: [
          ['id', 'DESC'],
      ],
        raw: true
      });

      res.json(expiredBoxes)
    }
    
  } catch (error) {
    console.log(error);
  }
};

exports.editBox = async (req, res) => { 
  try {
  const boxEdited = await Box.findByPk(req.body.id);

  boxEdited.name = req.body.name;
  boxEdited.count = req.body.count;
  boxEdited.price = req.body.price;
  boxEdited.start_date = req.body.start_date;
  boxEdited.end_date = req.body.end_date;
  boxEdited.descr = req.body.descr;
  
  await boxEdited.save();
  res.json(boxEdited)

  } catch (error) {
    console.log(error);
  }
};

exports.deleteBox = async (req, res) => {

  try {
  if (req.params.id === 'active') {
    await Box.destroy({
      where: {
        id: req.body.id,
      }
    })
  } else {
    const delBox = await Box.findByPk(req.body.id);
    delBox.rest_visibility = false;
    await delBox.save();
  }
  res.json('successfully');

} catch (error) {
  console.log(error);
  res.json('failed')
  }
}

exports.getActiveOrders = async (req, res) => {
  try {
    if (req.params.id === 'active') {
    const activeOrders = await Order.findAll({
      attributes:
        ['id', 'box_id', 'client_id', 'order_count', 'order_code', 'picked_up', 'createdAt',
          [Sequelize.col('Client.name'), 'client_name'],
          [Sequelize.col('Client.phone'), 'client_phone'],
          [Sequelize.col('Box.name'), 'box_name'],
          [Sequelize.col('Box.price'), 'box_price'],
          [Sequelize.col('Box.start_date'), 'box_start_date'],
          [Sequelize.col('Box.end_date'), 'box_end_date'],
        ],
      include: [{ model: Box, attributes: ['end_date', 'store_id'] }, { model: Client, attributes: [] }],
      where: { 
        '$Box.end_date$': {
          [Op.gt]: new Date()
        },
        '$Box.store_id$': req.body.id,
        picked_up: false,
      },
      order: [
        ['id', 'DESC'],
    ],
      raw: true,
    });
    
    res.json(activeOrders)
  } else if (req.params.id === 'picked'){
    const pickedOrders = await Order.findAll({
      attributes:
        ['id', 'box_id', 'client_id', 'order_count', 'order_code', 'picked_up', 'createdAt',
          [Sequelize.col('Client.name'), 'client_name'],
          [Sequelize.col('Client.phone'), 'client_phone'],
          [Sequelize.col('Box.name'), 'box_name'],
          [Sequelize.col('Box.price'), 'box_price'],
          [Sequelize.col('Box.start_date'), 'box_start_date'],
          [Sequelize.col('Box.end_date'), 'box_end_date'],
        ],
      include: [{ model: Box, attributes: ['end_date', 'store_id'] }, { model: Client, attributes: [] }],
      where: { 
        picked_up: true,
        rest_visibility: true,
        '$Box.store_id$':  req.body.id
      },
      order: [
        ['id', 'DESC'],
    ],
      raw: true,
    });
  
    res.json(pickedOrders)
  } else {
    const expiredOrders = await Order.findAll({
      attributes:
        ['id', 'box_id', 'client_id', 'order_code', 'order_count', 'picked_up', 'createdAt',
          [Sequelize.col('Client.name'), 'client_name'],
          [Sequelize.col('Client.phone'), 'client_phone'],
          [Sequelize.col('Box.name'), 'box_name'],
          [Sequelize.col('Box.price'), 'box_price'],
          [Sequelize.col('Box.start_date'), 'box_start_date'],
          [Sequelize.col('Box.end_date'), 'box_end_date'],
        ],
      include: [{ model: Box, attributes: ['end_date', 'store_id'] }, { model: Client, attributes: [] }],
      where: { 
        '$Box.end_date$': {
          [Op.lt]: new Date()
        },
        picked_up: false,
        '$Box.store_id$':  req.body.id,
        rest_visibility: true
      },
      order: [
        ['id', 'DESC'],
    ],
      raw: true,
    });
    
    res.json(expiredOrders)
  }
  
  } catch (error) {
    console.log(error);
  }
}

exports.giveOrder = async (req, res) => { 
  try {
  const orderEdited = await Order.findByPk(req.body.id);
  const boxEdited = await Box.findByPk(orderEdited.dataValues.box_id);
  orderEdited.picked_up = true;
  boxEdited.count_bought += orderEdited.order_count;
  boxEdited.count_reserved -= orderEdited.order_count;
  await boxEdited.save();
  await orderEdited.save();
  res.end()
  } catch (error) {
    console.log(error);
  }
};

exports.deleteOrder = async (req, res) => {

  if(req.params.id === 'active') {
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
    delOrder.rest_visibility = false;
    await delOrder.save();
  }
  
  res.end();
}


exports.deleteAll = async (req, res) => {
  if(req.body.model === 'Box') {
    for (let i of req.body.arrId) {
      const delBox = await Box.findByPk(i);
      delBox.rest_visibility = false;
      await delBox.save();
    }
  } else {
    for (let i of req.body.arrId) {
      const delOrder = await Order.findByPk(i);
      delOrder.rest_visibility = false;
      await delOrder.save();
    }
  }
  res.end();
}

