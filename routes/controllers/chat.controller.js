const createError = require('http-errors');
const mongoose = require('mongoose');

const Chat = require('../../models/Chat');
const { ERR_MSG } = require('../../constants/errors/errorMessage');

exports.getChat = async (req, res, next) => {
  try {
    const { channelId } = req.params;
    const chat = await Chat.findOne({ channelId }).lean();

    res.send({
      result: 'ok',
      data: chat ? chat.chatList : [],
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

exports.addChat = async (req, res, next) => {
  try {
    const { channelId, chatList } = req.body;
    const chat = await Chat.findOneAndUpdate({ channelId }, { chatList });

    if (!chat) {
      await Chat.create(req.body);
    }

    res.json({
      result: 'ok',
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
