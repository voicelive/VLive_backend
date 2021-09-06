const jwt = require('jsonwebtoken');
const { tokenSecretKey } = require('../../configs');
const createError = require('http-errors');

const { ERR_MSG } = require('../../constants/errors/errorMessage');

const User = require('../../models/User');

exports.login = async function (req, res) {
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
