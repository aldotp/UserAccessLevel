const jwt = require("jsonwebtoken");
const keys = require("../config/keys");

const auth = async (req, res, next) => {
  const token = req.header("x-auth-token");
  if (!token) {
    return res.status(401).json({
      code: 401,
      msg: "Unauthorized access",
    });
  }

  try {
    const decoded = jwt.verify(token, keys.jwtSecret);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({
      code: 401,
      message: "Token is not valid",
    });
  }
};

module.exports = auth;
