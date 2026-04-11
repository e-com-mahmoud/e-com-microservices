const jwt = require('jsonwebtoken');
const { userServices } = require('../services');
const { StatusCodes } = require('http-status-codes');
const jwtConfig = require('../config/config');

const secret = jwtConfig.jwt.secret

const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    if(!token) throw new Error('Bad token');
    const decoded = jwt.verify(token, secret);
    if(!decoded) throw new Error('Not authorized')
    const user = await userServices.findUser(decoded.userId);
    if (!user) throw new Error('Not authorized');
    req.token = decoded;
    req.user = user;
    return next();
  } catch (e) {
    const errorMessage = e.message || e;
    return res.status(StatusCodes.UNAUTHORIZED).send('Unauthorized');
  }
};

module.exports = auth;
