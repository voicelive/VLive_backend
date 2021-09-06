const createError = require('http-errors');
const mongoose = require('mongoose');

const { ERR_MSG } = require('../../constants/errors/errorMessage');

const Episode = require('./../../models/Episode');

exports.getEpisodes = async function (req, res, next) {
  try {
    const episodes = await Episode.find().exec();

    res.json({
      result: 'ok',
      data: episodes,
    });
  } catch (err) {
    console.error(err);

    if (err instanceof mongoose.Error.ValidationError) {
      return res.status(400).json({
        result: 'error',
        message: ERR_MSG.INVALID_DATA,
      });
    }

    next(createError(500, ERR_MSG.SERVER_ERR));
  }
};
