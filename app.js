const express = require('express');
const createError = require('http-errors');
const initialLoaders = require('./loader');

const index = require('./routes');
const episode = require('./routes/episode');
const channel = require('./routes/channel');
const chat = require('./routes/chat');

const { ERR_MSG } = require('./constants/errors/errorMessage');

const app = express();

initialLoaders(app);

app.use('/', index);
app.use('/episode', episode);
app.use('/channel', channel);
app.use('/chat', chat);

app.use((req, res, next) => {
  next(createError(404, ERR_MSG.NOT_FOUND));
});

app.use((err, req, res) => {
  console.error(err);

  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500).json({
    result: 'error',
    message: err.message,
  });
});

module.exports = app;
