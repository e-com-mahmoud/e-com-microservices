const jwt = require("jsonwebtoken");

function token(payload) {
  return jwt.sign(payload, process.env.SECRET, {
    expiresIn: process.env.EXPIRATION,
  });
}

module.exports = token;
