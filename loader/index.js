const express = require('express');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const connectMongoDB = require('./db');
const { corsOption } = require('../configs');

function initialLoaders(app) {
  app.use(logger('dev'));

  app.use(cors(corsOption));
  app.use(express.json());
  app.use(cookieParser());
  app.use(express.urlencoded({ extended: false }));

  connectMongoDB();
}

module.exports = initialLoaders;
