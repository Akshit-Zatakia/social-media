require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  // Get token from header
  const token = req.header("x-auth-token");

  // Check if no token
  if (!token) {
    return res
      .status(401)
      .json({ message: "No token, authorization denied", error: true });
  }

  // Verify token
  try {
    const decoded = jwt.verify(token, process.env.JWTSECRET);
    req.user = decoded.user;
    next();
  } catch (e) {
    res.status(401).json({ message: "Token is not valid", error: true });
  }
};
