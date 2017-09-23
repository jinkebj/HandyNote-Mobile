var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  HANDYNOTE_SERVICE_API: JSON.stringify(process.env.HANDYNOTE_SERVICE_API)
})
