const bcrypt = require('bcryptjs');
const { Client, Store, Stores_Cuisine, Cuisine } = require('../db/models');
const { formatSendData } = require('../lib/formatDBData');
const { getUser } = require('../lib/getUser');
const nodemailer = require("nodemailer");
const { sendNotice } = require('../lib/nodemailer')

require('dotenv').config();

exports.isUser = (req, res) => {
  try {
    res.json(
      req.session.user ? req.session.user : false
    );
  } catch(error) {
    console.log(error);
  }
};

exports.createUserAndSession = async (req, res) => {
  const { email, password, address, cuisine } = req.body;

  let cuisineId;
  if (cuisine) cuisineId = await Cuisine.findOne({where: {name: cuisine}});

  let newUser;

  try {
    const oldUser = await getUser({email});
    
    if (oldUser) {
      res.status(401).end();
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    
    if (address) {
      newUser = await Store.create(
        {...req.body,
          password: hashedPassword,
        });

      await Stores_Cuisine.create({
        store_id: newUser.id,
        cuisine_id: cuisineId.id
      }); 
    } 
    else newUser = await Client.create(
      {...req.body,
        password: hashedPassword,
      });
    
    const formatedUser = formatSendData(newUser.toJSON())
    
    if (formatedUser.address) formatedUser.cuisine = cuisine;

    req.session.user = formatedUser; 

    const text = `<p>Hello, ${req.body.name}!</p>
                  <p>You have successfully registered on the Delifood website!</p>`

    sendNotice(email, text).catch(console.error); // sending email to registered user

    res.json(formatedUser);

  } catch (err) {
    console.log(err);
    res.status(401).end();
  }  
};

exports.checkUserAndCreateSession = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await getUser({email});
    if (user && !user.address) { 
      await bcrypt.compare(password, user.password);
      const formatedUser = formatSendData(user.toJSON())
    
    req.session.user = formatedUser; 
    res.json(formatedUser);

    } else if (user.address) {
      const cuisine = await Cuisine.findOne({
        include: [{
          model: Store,
          attributes: [],
          required: true, 
          where: {id: user.id}
        }],
      }, {raw: true});

      user.cuisine = cuisine.name;
      const formatedUser = formatSendData(user.toJSON());
      formatedUser.cuisine = cuisine.name;

      req.session.user = formatedUser; 
      res.json(formatedUser);
    }

    else res.status(401).end();
    
  } catch (err) {
    console.log(err);
  }
}

exports.destroySession = async (req, res, next) => {
  req.session.destroy((err) => {
    if (err) return next(err);
    res.clearCookie('sid');
    return res.status(200).end();
  });
}
