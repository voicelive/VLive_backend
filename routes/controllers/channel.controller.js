const createError = require('http-errors');
const mongoose = require('mongoose');

const Channel = require('../../models/Channel');

exports.getChannel = async (req, res, next) => {
  try {
    const { channelId } = req.params;
    const channel = Channel.findById(channelId);

    res.json({
      result: 'ok',
      data: channel,
    });
  } catch (err) {
    console.error(err);

    if (err instanceof mongoose.Error.ValidationError) {
      for (field in err.errors) {
        res.status(500).json({
          result: 'error',
          message: err.errors[field].message,
        });
      }
    }

    next(createError(500));
  }
};
