const jwt = require('jsonwebtoken');
const { tokenSecretKey } = require('../../configs');

const { ERR_MSG } = require('../../constants/errors/errorMessage');

const User = require('../../models/User');

exports.login = async (req, res, next) => {
  try {
    const userInfo = req.body;
    const token = jwt.sign(userInfo, tokenSecretKey);

    let user = await User.findOne(userInfo).exec();

    if (user !== null) {
      user = await User.create(userInfo);
    }

    res.json({
      result: 'ok',
      data: {
        token,
        user,
      },
    });
  } catch(err) {
    res.status(500).json({
      result: 'error',
      message: ERR_MSG.UNKNOWN_ERR,
    });
  }
};
