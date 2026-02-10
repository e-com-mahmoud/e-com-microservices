const { StatusCodes } = require("http-status-codes");
const { userServices } = require("../services");

async function checkEmail(req, res, next) {
  const { email } = req.body;
  try {
    const emailCheck = await userServices.findUserByEmail(email);

    return emailCheck
      ? res.status(StatusCodes.BAD_REQUEST).send("already in use")
      : next();
  } catch (e) {
    const errorMessage = e.message || e;
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(errorMessage);
  }
}

module.exports = checkEmail;
