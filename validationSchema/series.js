const Joi = require("joi");

exports.SeriesValidation = Joi.object({
  id: Joi.string().required(),
  name: Joi.string().required(),
  genere: Joi.string().required(),
  imdb: Joi.string().required(),
  platform: Joi.string().required(),
});
