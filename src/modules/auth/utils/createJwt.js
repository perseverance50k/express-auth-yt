const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;

const createJwt = (payload, options) => {
  return jwt.sign(payload, JWT_SECRET, options);
};

module.exports = { createJwt };
