const passport = require('passport');
const express = require('express');
const logger = require('morgan');
const path = require('path');
const cors = require('cors');
require('dotenv').config();

const session = require('./src/middleware/createSession');
const isUser = require('./src/middleware/isUser');

const authRouter = require('./src/routes/auth');
const StoreRoutes = require('./src/routes/profile')
const crmRouter = require('./src/routes/crm')

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(
  cors({
    origin: true,
    credentials: true,
  }),
);

app.use(session);

//passport initialization
app.use(passport.initialize());
app.use(passport.session());

app.use(isUser);

app.use('/auth', authRouter);
app.use('/profile', StoreRoutes);
app.use('/crm', crmRouter);

module.exports = app;
