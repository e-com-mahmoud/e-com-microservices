const jwt = require('jsonwebtoken');
const { userServices } = require('../services');
const { StatusCodes } = require('http-status-codes');

const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, process.env.SECRET);
    const user = await userServices.findUser(decoded);

    if (!user) throw new Error('Not authorized');
    req.token = decoded;
    req.user = user;
    return next();
  } catch (e) {
    const errorMessage = e.message || e;
    return res.status(StatusCodes.UNAUTHORIZED).send(errorMessage);
  }
};

module.exports = auth;
