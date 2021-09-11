const createError = require('http-errors');
const mongoose = require('mongoose');

const { ObjectId } = mongoose.Types;
const { ERR_MSG } = require('../../constants/errors/errorMessage');

function validateObjectId(req, _, next) {
  for (const id of Object.values(req.params)) {
    if (!ObjectId.isValid(id)) {
      return next(createError(404, ERR_MSG.NOT_FOUND));
    }
  }

  return next();
}

module.exports = validateObjectId;
