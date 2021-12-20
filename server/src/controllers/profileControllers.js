const { Store, Client, Stores_Cuisine, Cuisine } = require('../db/models');
const { getUser } = require('../lib/getUser');
const path = require('path');

const multer = require('multer');
const { formatSendData } = require('../lib/formatDBData');

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
  const {id} = req.session.user;
  let newItem = await getUser({id});

  if (!newItem) res.status(401).end();
  
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
      await Stores_Cuisine.update(
        {
          cuisine_id: (await Cuisine.findOne({where: {name: req.body.cuisine}})).id
        },
        {
          where: {store_id: id},
        },
      );

    } catch (error) {
      console.log('The data was not added to the data base', error);
    }
  }

  if (newItem instanceof Client) {
    try {
      newItem.set(req.body);
      await newItem.save();
    } catch (error) {
      console.log('The data was not added to the data base', error);
    }
  }

  const sendData = formatSendData({...newItem.toJSON()});

  if (sendData.address) {
    sendData.cuisine = req.body.cuisine
  }
  req.session.user = sendData;

  return res.json(sendData);
};