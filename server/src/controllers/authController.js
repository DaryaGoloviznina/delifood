const bcrypt = require('bcryptjs');
const { Client, Store } = require('../db/models');
require('dotenv').config();

function serializeUser(user) {
  return {
    id: user.id,
    name: user.name,
    
  };
}

exports.isUser = (req, res) => {
  console.log('userrrrr=>', req.session.user)
  try {
    res.json(
      req.session.user ? req.session.user : false
    );
  } catch(error) {
    console.log(error);
  }
};

exports.createUserAndSession = async (req, res) => {
  const { name, password, email, address } = req.body;
  
  try {
    const client = await Client.findOne({where: { email: email }});
    const store = await Store.findOne({where: { email: email }});
    
    if (client || store) {
      res.status(401).end();
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    
    if (address) {
      const newStore = await Store.create({
        name,
        email,
        password: hashedPassword,
        address
      })
      req.session.user = serializeUser(newStore); 
      res.json(newStore);
    } else {
      const newUser = await Client.create({
        name,
        email,
        password: hashedPassword,
      });
      req.session.user = serializeUser(newUser); 
      res.json(newUser);
    }
  } catch (err) {
    console.log(err)
  }
  res.end();
};

exports.checkUserAndCreateSession = async (req, res, next) => {
  const { email, password } = req.body;
  
  try {
    const client = await Client.findOne({where: { email: email }});
    const store = await Store.findOne({where: { email: email }});
    
    if (client) {
      await bcrypt.compare(password, client.password);
      req.session.user = serializeUser(client);
      res.json(client).end();
    }
    
    if (store) {
      await bcrypt.compare(password, store.password);
      req.session.user = serializeUser(store);
      res.json(store).end();
    }
    res.status(401).end();
    
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
