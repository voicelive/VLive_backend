const jwt = require('jsonwebtoken');
const { TOKEN_SECRET_KEY } = process.env;

const {
  VliveError,
  JsonWebTokenError,
  TokenExpiredError,
} = require('../../lib/errors');

async function verifyToken(req, _, next) {
  try {
    if (req.headers.authorization == null) {
      throw new JsonWebTokenError();
    }

    const token = req.headers.authorization.split(' ')[1];

    await jwt.verify(token, TOKEN_SECRET_KEY);

    next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return next(new TokenExpiredError());
    }

    if (err.name === 'JsonWebTokenError') {
      return next(new JsonWebTokenError());
    }

    next(new VliveError());
  }
}

module.exports = verifyToken;
