const { StatusCodes } = require("http-status-codes");
const { itemServices } = require("../services");

async function checkItem(req, res, next) {
  const { id } = req.params;
  try {
    const item = await itemServices.findItem(id);
    req.item = item;
    item ? next() : res.status(StatusCodes.NOT_FOUND).send();
  } catch (e) {
    const errorMessage = e.message || e;
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(errorMessage);
  }
}

module.exports = checkItem;
