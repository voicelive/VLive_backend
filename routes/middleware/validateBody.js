const Joi = require('joi');
const { VALIDATION_MSG } = require('../../constants/errors/validationMessage');

const bodySchema = Joi.object({
  name: Joi.required(),
  episodeId: Joi.required(),
  host: Joi.required(),
});

function validateBody(req, res, next) {
  const { error } = bodySchema.validate(req.body);

  if (error) {
    return res.status(400).json({
      result: 'error',
      message: VALIDATION_MSG.FILL_BLANK,
    });
  }

  next();
}

module.exports = validateBody;
