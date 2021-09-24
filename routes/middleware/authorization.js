const jwt = require('jsonwebtoken');

const { tokenSecretKey } = require('../../configs/index');
const { ERR_MSG } = require('../../constants/errors/errorMessage');

async function verifyToken(req, res, next) {
  try {
    if (req.headers.authorization == null) {
      throw new Error(ERR_MSG.INVALID_TOKEN);
    }

    const token = req.headers.authorization.split(' ')[1];

    await jwt.verify(token, tokenSecretKey);

    next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      res.status(401).json({
        result: 'error',
        message: ERR_MSG.TOKEN_EXPIRED,
      });
    } else if (err.name === 'JsonWebTokenError') {
      res.status(401).json({
        result: 'error',
        message: ERR_MSG.INVALID_TOKEN,
      });
    } else {
      res.status(401).json({
        result: 'error',
        message: err.message,
      });
    }
  }
}

module.exports = verifyToken;
