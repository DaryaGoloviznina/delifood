const { Store, Client } = require('../db/models');
const path = require('path');

const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './storage/rests/images');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

exports.upload = multer({ storage });

const getItem = async (id) => {
  let item = await Store.findOne({where: {id}})
  if (!item) item = await Client.findOne({where: {id}});
  return item;
}

exports.updateProfile = async (req, res) => {
  let newItem = await getItem(req.params.id);
  if (newItem instanceof Store) {
    try {
      newItem.set(
      {...req.body,
        store_img: `/rests/images/${req.file.filename}`,
      });
      await newItem.save();
    } catch (error) {
      console.log('Не удалось добавить запись в базу данных.', error);
    }
  }
  if (newItem instanceof Client) {
    try {
      newItem.set(req.body);
      await newItem.save();
    } catch (error) {
      console.log('Не удалось добавить запись в базу данных.', error);
    }
  }
  return res.json(newItem);
};