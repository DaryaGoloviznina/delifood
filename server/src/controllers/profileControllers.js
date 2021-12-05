const { Store, Client } = require('../db/models');
const { getUser } = require('../lib/getUser');
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

exports.updateProfile = async (req, res) => {
  let newItem = await getUser(req.body.email);

  if (newItem instanceof Store) {
    try {
      newItem.set(
        req.file ?
        {...req.body,
          store_img: `/rests/images/${req.file.filename}`,
        }
        : req.body
        );

      await newItem.save();
      req.file = null;

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