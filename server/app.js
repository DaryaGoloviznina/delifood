const express = require('express');
const logger = require('morgan');
// const passport = require('passport');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(logger('dev'));

app.use(
  cors({
    origin: true,
    credentials: true,
  }),
);

// app.use(passport.initialize()); // этот мидлвер необходим для корректной работы passport
// app.use(passport.session()); // этот мидлвер необходим для корректной работы passport

module.exports = app;
