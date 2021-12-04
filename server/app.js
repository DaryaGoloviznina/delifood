const express = require('express');
const logger = require('morgan');
const path = require('path');
const cors = require('cors');
require('dotenv').config();

const session = require('./src/middleware/createSession');
const isUser = require('./src/middleware/isUser');

const authRouter = require('./src/routes/auth');

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
app.use(isUser);

app.use('/auth', authRouter);

module.exports = app;
