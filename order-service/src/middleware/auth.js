const jwt = require("jsonwebtoken");
const { StatusCodes } = require("http-status-codes");

const { userServices } = require("../services");
const jwtConfig = require("../config/config");
const secret = jwtConfig.jwt.secret;

const auth = async (req, res, next) => {
  try {
    const authHeader = req.header("Authorization");
    if (!authHeader) {
      throw new Error("Authorization header is required");
    }
    if (!authHeader.startsWith("Bearer ")) {
      throw new Error("Invalid authorization format");
    }
    const token = authHeader.replace("Bearer ", "");
    if (!token) {
      throw new Error("Authorization token is required");
    }
    const decoded = jwt.verify(token, secret);
    const user = await userServices.findUser(decoded);
    if (!user) {
      throw new Error("User not found");
    }
    req.token = token;
    req.user = user;
    next();
  } catch (e) {
    const errorMessage = e.message || e;
    return res.status(StatusCodes.UNAUTHORIZED).send(errorMessage);
  }
};

module.exports = auth;
