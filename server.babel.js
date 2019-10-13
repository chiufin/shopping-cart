// enable runtime transpilation to use ES6/7 in node

const fs = require('fs')

const babelrc = fs.readFileSync('./babel.config.js')
let config

try {
  config = JSON.parse(babelrc)
} catch (err) {
  console.error('==>     ERROR: Error parsing your babel.config.js')
  console.error(err)
}


require('@babel/register')({
  ...config,
  plugins: [
    ...config.babelrc,
    'dynamic-import-node',
  ]
})
