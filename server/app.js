const express = require('express');
const logger = require('morgan');
const path = require('path');
const cors = require('./src/middleware/cors')
require('dotenv').config();

const session = require('./src/middleware/createSession');
const isUser = require('./src/middleware/isUser');

const authRouter = require('./src/routes/auth');
const StoreRoutes = require('./src/routes/profile')
const boxesRouter = require('./src/routes/boxes');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'storage')));

app.use(cors);

app.use(session);
app.use(isUser);

app.use('/auth', authRouter);
app.use('/profile', StoreRoutes);
app.use('/boxes', boxesRouter);

module.exports = app;
