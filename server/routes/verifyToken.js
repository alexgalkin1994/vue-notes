const jwt = require("jsonwebtoken");

module.exports = function(req, res, next) {
  const token = req.header("Authorization");

  if (token) {
    jwt.verify(token, process.env.SECRET, (err, user) => {
      if (err) {
        return res.json({
          success: false,
          message: "Token is not valid"
        });
      } else {
        req.user = user;
        next();
      }
    });
  } else {
    return res.json({
      success: false,
      message: "Auth token is not supplied"
    });
  }
};
