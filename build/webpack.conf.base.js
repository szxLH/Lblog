const path = require('path')
// const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
  entry: './src/index.js',
  module: {
    preLoaders: [
      {
        test: /\.js$/,
        loader: 'eslint',
        exclude: '/node_modules'
      }
    ],
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        include: [path.resolve(__dirname, '../src')],
        query: {
          presets: ['es2015', 'stage-3', 'react'],
          // presets: ['react', 'latest'],
          plugins: ['antd' , 'transform-decorators-legacy', 'transform-runtime']
        }
      }, 
      {
        test: /\.css$/,
      //   loader: ExtractTextPlugin.extract('style-loader','css-loader'),
        loader: 'style!css',
      //   exclude: 'node_modules'
      }, 
      {
        test: /\.less$/,
        // loader: ExtractTextPlugin.extract('style-loader','css-loader', 'less-loader'),
        loader: 'style!css!less',
      }, {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loader: 'url',
        exclude: 'node_modules',
        query: {
          limit: 25000,
          name: '[path][name].[hash].[ext]'
        }
      }
    ]
  },

  resolve:{
    extensions: ['', '.js', '.json', '.less'],
    alias: {
      $config: path.resolve(__dirname, '../src/config'),
      $utility: path.resolve(__dirname, '../src/utility'),
      $service: path.resolve(__dirname, '../src/service'),
      $components: path.resolve(__dirname, '../src/components'),
    }
  },
  // plugins: [
  //   new ExtractTextPlugin('style.css', {allChunks: true})
  // ]
}