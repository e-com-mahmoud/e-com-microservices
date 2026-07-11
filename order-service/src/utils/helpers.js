function cartTotalMapper(cart) {
  return cart.Items.reduce(
    (total, item) => total + Number(item.quantity) * Number(item.Product.price),
    0,
  );
}

const helpers = { cartTotalMapper };

module.exports = helpers;
