const axios = require("axios");

const { cartClient } = require("../config/config");

async function getCart(token) {
  try {
    const res = await axios.get(`${cartClient.URL}/cart`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (e) {
    throw new Error(e.response.data);
  }
}

module.exports = getCart;
