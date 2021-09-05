const jwt = require('jsonwebtoken');
const User = require('../../models/User');
const { tokenSecretKey } = require('../../configs');
const { errorMessage } = require('../../constants/constant');

exports.login = async (req, res, next) => {
  try {
    const userInfo = req.body;
    const token = jwt.sign(userInfo, tokenSecretKey);

    let user = await User.findOne(userInfo);

    if (!user) {
      user = await User.create(userInfo);
    }

    res.status(200).json({
      result: 'ok',
      data: {
        token,
        user,
      },
    });
  } catch(err) {
    res.status(500).json({
      result: 'error',
      message: errorMessage.UNKNOWN_ERR,
    });
  }
};
