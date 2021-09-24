const jwt = require('jsonwebtoken');
const { tokenSecretKey } = require('../../configs');
const createError = require('http-errors');
const mongoose = require('mongoose');

const User = require('../../models/User');
const { ERR_MSG } = require('../../constants/errors/errorMessage');

exports.login = async (req, res, next) => {
  try {
    const userInfo = req.body;
    const token = jwt.sign(userInfo, tokenSecretKey);
    let user = await User.findOne(userInfo);

    if (user === null) {
      user = await User.create(userInfo);
    }

    res.json({
      result: 'ok',
      data: {
        token,
        user,
      },
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
