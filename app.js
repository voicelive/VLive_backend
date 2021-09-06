const express = require('express');
const createError = require('http-errors');

const initialLoaders = require('./loader');
const indexRouter = require('./routes');
const channelRouter = require('./routes/channel');

const app = express();

initialLoaders(app);

app.use('/', indexRouter);
app.use('/channel', channelRouter);

app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.send('Error');
});

module.exports = app;
