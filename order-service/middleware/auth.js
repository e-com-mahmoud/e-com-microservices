const jwt = require("jsonwebtoken");
const { StatusCodes } = require("http-status-codes");

const { userServices } = require("../services");
const jwtConfig = require("../config/config");
const secret = jwtConfig.jwt.secret;

const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    if (!token) throw new Error("Bad Token");
    const decoded = jwt.verify(token, secret);
    if (!decoded) throw new Error("Not Authorized");
    const user = await userServices.findUser(decoded);
    if (!user) throw new Error("Not Authorized");
    req.token = token;
    req.user = user;
    next();
  } catch (e) {
    const errorMessage = e.message || e;
    return res.status(StatusCodes.UNAUTHORIZED).send(errorMessage);
  }
};

module.exports = auth;
