const jwt = require('jsonwebtoken');
const TOKEN_SECRET_KEY = process.env.TOKEN_SECRET_KEY;
const { ERR_MSG } = require('../../constants/errors/errorMessage');

async function verifyToken(req, res, next) {
  const token = req.headers.authorization.split(' ')[1];

  try {
    const decoded = await jwt.verify(token, TOKEN_SECRET_KEY);

    if (decoded) {
      return next();
    }

    return res.status(401).json({
      result: 'error',
      message: ERR_MSG.TOKEN_EXPIRED,
    });
  } catch {
    res.status(401).json({
      result: 'error',
      message: ERR_MSG.UNAUTHENTICATED,
    });
  }
}

module.exports = verifyToken;
