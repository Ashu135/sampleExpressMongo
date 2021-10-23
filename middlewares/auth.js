const config = require("../config/default.json");
const jwt = require("jsonwebtoken");
generateAuthToken = function (reqData, role) {
  let private = config.jwtPrivateKey;
  let expire = config.expiration
  const token = jwt.sign({ name: reqData.name, roleStatus: role }, private,{expiresIn:expire});
  return token;
};

verifyJWT = function (req, res, next) {
  const token = req.header("x-auth-token");
  if (!token) return res.status(401).send("Access denied. No token provided.");

  try {
    const decoded = jwt.verify(token, config.jwtPrivateKey);
    req.user = decoded;
    next();
  } catch (ex) {
    res.status(400).send("Invalid token.");
  }
};

module.exports = { generateAuthToken, verifyJWT };
