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

const getItem = async (email) => {
  let item = await Store.findOne({
    where: {email}, 
    attributes: { exclude: ['updatedAt', 'createdAt', 'password'] }
    })

  if (!item) item = await Client.findOne({
    where: {email}, 
    attributes: { exclude: ['updatedAt', 'createdAt', 'password'] }
  });
  return item;
}

exports.updateProfile = async (req, res) => {
  let newItem = await getItem(req.body.email);
  if (newItem instanceof Store) {
    try {
      newItem.set(
        req.store_img ?
        {...req.body,
          store_img: `/rests/images/${req.file.filename}`,
        }
        : req.body
        );
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

  const sendData = {...newItem.toJSON()};
  delete sendData['updatedAt'];
  return res.json(sendData);
};