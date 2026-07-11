const jwt = require("jsonwebtoken");
const jwtConfig = require("../config/config");

const expiration = jwtConfig.jwt.expiration;
const secret = jwtConfig.jwt.secret;

function token(payload) {
  return jwt.sign(payload, secret, {
    expiresIn: expiration,
  });
}

module.exports = token;
