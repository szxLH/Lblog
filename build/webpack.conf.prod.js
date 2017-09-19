const path = require('path')
const config = require('./webpack.conf.base')
const webpack = require('webpack')
const AssetsPlugin = require('assets-webpack-plugin')
const packageJson = require('../package.json')
const HtmlWebpackPlugin = require('html-webpack-plugin')
// var assetsRoot = path.join(__dirname, '../src/public')

config.output = {
  filename: '[name]-[hash].bundle.js',
  path: './app/public/prod',
  publicPath: '/public/'
}

config.plugins = [
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify('production')
    },
    'VERSION': JSON.stringify(packageJson.version)
  }),
  new AssetsPlugin({ fullPath: false })
]

module.exports = config
