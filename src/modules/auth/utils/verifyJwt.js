const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;

const verifyJwt = (token) => {
  return jwt.verify(token, JWT_SECRET);
};

module.exports = {
  verifyJwt,
};
