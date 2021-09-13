const jwt = require('jsonwebtoken');

const { TOKEN_SECRET_KEY } = process.env;
const { ERR_MSG } = require('../../constants/errors');

async function verifyToken(req, res, next) {
  const token = req.headers.authorization.split(' ')[1];

  try {
    await jwt.verify(token, TOKEN_SECRET_KEY);

    next();
  } catch (err) {
    if (err.message === 'TokenExpiredError') {
      res.status(401).json({
        result: 'error',
        message: ERR_MSG.TOKEN_EXPIRED,
      });
    } else if (err.message === 'JsonWebTokenError') {
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