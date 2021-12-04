const passport = require('passport');
const bcrypt = require('bcryptjs');
const passportLocal = require('passport-local');
const LocalStrategy = passportLocal.Strategy;
const { Client, Store } = require('../db/models');
require('dotenv').config();

exports.isUser = (req, res) => {
  console.log('userrrrr=>', req.user)
  try {
    res.json(
      req.user ? req.user : false
    );
  } catch(error) {
    console.log(error);
  }
};

exports.signOut = (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.status(400).end();
    res.clearCookie('sid');
    return res.status(200).end();
  }) 
};

passport.serializeUser(async (user, done) => {
  console.log('serializeUser', user.id);
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const client = await Client.findOne({where: { id: id }});
    const store = await Store.findOne({where: { id: id }});
    
    if (client) {
      done(null, client.toJSON());
    }
    if (store) {
      done(null, store.toJSON());
    }
  } catch (error) {
    done(error);
  }
});

const UserAuth = async (req, email, pass, done) => {
  const { name, address } = req.body;

  try {
    //--------------login logic
    if (/login/.test(req.path)) {
      const client = await Client.findOne({where: { email: email }});
      const store = await Store.findOne({where: { email: email }});

      if (!client || !store) return done(null, false);
      
      if (client) {
        if (await bcrypt.compare(pass, client.password)) return done(null, client);
      }
      if (store) {
        if (await bcrypt.compare(pass, store.password)) return done(null, store);
      }
      return done(null, false, { message: 'incorrect password' });
    }

    //------------sign up logic
    if (/signup/.test(req.path) && name && pass && email) {
      const client = await Client.findOne({where: { email: email }});
      const store = await Store.findOne({where: { email: email }});
      
      if (client || store) {
        return done(null, false);
      } 

      const hashPass = await bcrypt.hash(pass, 10);
      if (address) {
        const newStore = await Store.create({
          name,
          email,
          password: hashPass,
          address
        })
        done(null, newStore);
      } else {
        const newUser = await Client.create({
          name,
          email,
          password: hashPass,
        });
        done(null, newUser);
      }
    } else {
      return done(null, false);
    }
  } catch (error) {
    console.log(error);
  }
};

passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true,
    },
    UserAuth,
  ),
);