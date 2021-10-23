const { Roles } = require("../Enum");
module.exports = function (req, res, next) {
  // 401 Unauthorized
  // 403 Forbidden
  if (req.user.roleStatus != Roles.ADMIN)
    return res.status(403).send("Access Denied!!! You need permission to access this site");
  next();
};
