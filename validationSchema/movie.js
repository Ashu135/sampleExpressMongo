const Joi = require("joi");

exports.InfoValidation = Joi.object({
  id: Joi.string().required(),
  name: Joi.string().min(3).required(),
  genere: Joi.string().min(3).required(),
  rating: Joi.string().required(),
});
  