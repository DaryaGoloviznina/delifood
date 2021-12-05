const { Box } = require('../db/models');

exports.addNewBox = async (req, res) => {
  try {
    const newBox = await Box.create({
      name: req.body.name,
      count: req.body.count,
      price: req.body.price,
      start_date: req.body.start_date,
      end_date: req.body.end_date,
      store_id: req.body.store_id,
    });
    res.json(newBox)
  } catch (error) {
    console.log(error);
  }
};

exports.getActiveBoxes = async (req, res) => { // дописать условия на активные, пока достаю все
 
  try {
    const activeBoxes = await Box.findAll({
      order: [
        ['id', 'DESC'],
    ],
      raw: true
    });
    console.log(activeBoxes)
    res.json(activeBoxes)
  } catch (error) {
    console.log(error);
  }
};

exports.editBox = async (req, res) => { // дописать условия на активные, пока достаю все
  try {
  const boxEdited = await Box.findByPk(req.body.id);
 // delete req.body.timeFrom
 // boxEdited.set(req.body)
  boxEdited.name = req.body.name;
  boxEdited.count = req.body.count;
  boxEdited.price = req.body.price;
  boxEdited.start_date = req.body.start_date;
  boxEdited.end_date = req.body.end_date;
  
  await boxEdited.save();
  res.json(boxEdited)

  } catch (error) {
    console.log(error);
  }
};

exports.deleteBox = async (req, res) => {
  await Box.destroy({
    where: {
        id: req.body.id,
    }
  })
}
