const products = require('./data/products')

const getProducts = {
  path: '/products',
  method: 'GET',
  delay: 100,
  cache: false,
  template: () => products,
  render: (req, res) => {
    res.header('cache-control', 'no-cache, max-age=0, must-revalidate, no-store')
    return res.send(res.body)
  },
}

module.exports = getProducts
