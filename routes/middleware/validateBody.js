const Joi = require('joi');

const { VALIDATION_MSG } = require('../../constants/errors/validationMessage');

function validateBody(req, res, next) {
  const bodySchema = Joi.object().keys({
    name: Joi.string().required().max(30),
    episode: Joi.string().required(),
    host: Joi.string().required(),
  });

  const result = bodySchema.validate(req.body);
  const { value, error } = result;

  if (!error) {
    return next();
  } else {
    res.status(400).json({
      result: 'error',
      message: VALIDATION_MSG.FILL_BLANK,
    });
  }
};

module.exports = validateBody;
