const bcrypt = require('bcryptjs');
const { Client, Store } = require('../db/models');
const { formatSendData } = require('../lib/formatDBData');
const { getUser } = require('../lib/getUser');
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
  const { email, password, address } = req.body;
  let newUser;

  try {
    const oldUser = await getUser({email});
    
    if (oldUser) {
      res.status(401).end();
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    
    if (address) newUser = await Store.create(
      {...req.body,
        password: hashedPassword,
      });
    else newUser = await Client.create(
      {...req.body,
        password: hashedPassword,
      });
    
    const formatedUser = formatSendData(newUser.toJSON())

    req.session.user = formatedUser; 
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
    if (user) {
      await bcrypt.compare(password, user.password);
      const formatedUser = formatSendData(user.toJSON())
    
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
