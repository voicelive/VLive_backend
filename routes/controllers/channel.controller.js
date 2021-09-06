const createError = require('http-errors');
const mongoose = require('mongoose');
const Channel = require('../../models/Channel');

exports.getChannels = async (req, res) => {
  try {
    const channels = await Channel.find().lean();

    res.status(200).json({
      result: 'ok',
      data: channels,
    });
  } catch (err) {
    console.error(err);

    if (err instanceof mongoose.Error.ValidationError) {
      for (const field in err.errors) {
        return res.status(500).json({
          result: 'error',
          message: err.errors[field].message,
        });
      }
    }
  }
};

exports.getChannel = async (req, res, next) => {
  try {
    const { channelId } = req.params;
    const channel = await Channel.findById(channelId);

    res.json({
      result: 'ok',
      data: channel,
    });
  } catch (err) {
    console.error(err);

    if (err instanceof mongoose.Error.ValidationError) {
      for (const field in err.errors) {
        return res.status(500).json({
          result: 'error',
          message: err.errors[field].message,
        });
      }
    }

    next(createError(500));
  }
};
