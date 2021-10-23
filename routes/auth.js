const Joi = require("joi");
const _ = require("underscore");
const express = require("express");
const router = express.Router();
const gA = require("../middlewares/auth");
const validator = require("express-joi-validation").createValidator({});
const { Roles } = require("../Enum");

router.post("/", (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error);
  let loginCredentials = require("../config/loginInfo.json");
  let roleId = Roles.ADMIN;
  let isExist = _.findWhere(loginCredentials.Admins, {
    name: req.body.name,
    pass: req.body.pass,
  });
  if (isExist == undefined) {
    isExist = _.findWhere(loginCredentials.Users, {
      name: req.body.name,
      pass: req.body.pass,
    });
    roleId = Roles.USER;
  }
  if (isExist == undefined)
    return res.status(400).send("Invalid email or password.");
  const token = gA.generateAuthToken(req.body, roleId);
  res.send(token);
});

function validate(req) {
  const schema = {
    name: Joi.string().max(255).required(),
    pass: Joi.string().max(255).required(),
  };
  return validator.body(req, schema);
}

module.exports = router;
