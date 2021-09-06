const express = require('express');
const createError = require('http-errors');
const initialLoaders = require('./loader');

const index = require('./routes');
const episode = require('./routes/episode');

const { ERR_MSG } = require('./constants/errors/errorMessage');

const app = express();

initialLoaders(app);

app.use('/', index);
app.use('/episode', episode);

app.use(function(req, res, next) {
  next(createError(404, ERR_MSG.NOT_FOUND));
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500).json({
    result: 'error',
    message: err.message,
  });
});

module.exports = app;
