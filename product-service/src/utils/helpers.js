async function productDataMapper(result, page, pageSize = 10) {
  return {
    products: result.rows,
    totalCount: result.count,
    totalPages: Math.ceil(result.count / pageSize),
    currentPage: page,
  };
}

async function createProductEventMapper(products) {
  return products.map((product) => ({
    id: product.id,
    title: product.title,
    price: product.price,
    createdAt: product.createdAt,
  }));
}

const helpers = { productDataMapper, createProductEventMapper };

module.exports = helpers;
