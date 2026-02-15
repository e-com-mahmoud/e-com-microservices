async function productDataMapper(result, page, pageSize = 10) {
  return {
    products: result.rows,
    totalCount: result.count,
    totalPages: Math.ceil(result.count / pageSize),
    currentPage: page,
  };
}

const helpers = { productDataMapper };

module.exports = helpers;
