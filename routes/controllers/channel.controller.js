const { errorMessage } = require('../../constants/constant');
const Channel = require('../../models/Channel');

exports.getChannels = async (req, res, next) => {
  try {
    const channels = await Channel.find().lean();

    res.status(200).json({
      result: 'ok',
      data: channels,
    });
  } catch (err) {
    res.status(500).json({
      result: 'error',
      message: errorMessage.UNKNOWN_ERR,
    });
  }
};
