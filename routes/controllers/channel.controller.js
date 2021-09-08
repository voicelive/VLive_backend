const createError = require('http-errors');
const mongoose = require('mongoose');

const Channel = require('../../models/Channel');
const { ERR_MSG } = require('../../constants/errors/errorMessage');
const { VALIDATION_MSG } = require('../../constants/errors/validationMessage');

exports.getChannels = async (req, res, next) => {
  try {
    const channels = await Channel.find().lean();

    res.status(200).json({
      result: 'ok',
      data: channels,
    });
  } catch (err) {
    if (err instanceof mongoose.Error.ValidationError) {
      return res.status(400).json({
        result: 'error',
        message: ERR_MSG.INVALID_DATA,
      });
    }

    next(createError(500, ERR_MSG.SERVER_ERR));
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
    if (err instanceof mongoose.Error.ValidationError) {
      return res.status(400).json({
        result: 'error',
        message: ERR_MSG.INVALID_DATA,
      });
    }

    next(createError(500, ERR_MSG.SERVER_ERR));
  }
};

exports.createChannel = async (req, res, next) => {
  try {
    const { name, episodeId, userId } = req.body;

    if (await Channel.exists({ name })) {
      return res.status(400).json({
        result: 'error',
        message: VALIDATION_MSG.ALREADY_EXIST,
      });
    }

    const newChannel = await Channel.create({
      name,
      episode: episodeId,
      host: userId,
    });

    res.json({
      result: 'ok',
      data: newChannel._id,
    });
  } catch (err) {
    if (err instanceof mongoose.Error.ValidationError) {
      return res.status(400).json({
        result: 'error',
        message: ERR_MSG.INVALID_DATA,
      });
    }

    next(createError(500, ERR_MSG.SERVER_ERR));
  }
};

exports.getUserType = async (req, res, next) => {
  try {
    const { channelId, userId } = req.params;
    const { audience } = await Channel.findById(channelId);
    const audienceIdList = audience.map((user) => user._id.toString());
    const isAudience = audienceIdList.some((audience) => audience === userId);

    res.json({
      result: 'ok',
      data: isAudience ? 'audience' : 'player',
    });
  } catch (err) {
    if (err instanceof mongoose.Error.ValidationError) {
      return res.status(400).json({
        result: 'error',
        message: ERR_MSG.INVALID_DATA,
      });
    }

    next(createError(500, ERR_MSG.SERVER_ERR));
  }
};
