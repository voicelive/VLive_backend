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
      for (field in err.errors) {
        return res.status(500).json({
          result: 'error',
          message: err.errors[field].message,
        });
      }
    }

    next(createError(500, ERR_MSG.SERVER_ERR));
  }
};
