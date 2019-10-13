const express = require('express')
const dyson = require('dyson')
const path = require('path')

const options = {
  configDir: path.join(__dirname, '../stubs'),
}

const app = express()
const configs = dyson.getConfigurations(options)

dyson.registerServices(app, options, configs)

app.listen(3011)
