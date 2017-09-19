var path = require('path')
var config = require('./webpack.conf.base')
// var assetsRoot = path.join(__dirname, '../src/public')

config.output = {
  filename: '[name].bundle.js',
  path: './app/public/dev',
  publicPath: '/public/'
}

config.devtool = 'eval'

module.exports = config
