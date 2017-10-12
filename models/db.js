const mongoose = require('mongoose')
// const extend = require('mongoose-schema-extend')
const config = require('config-lite')
mongoose.connect(config.mongodb)
mongoose.Promise = global.Promise

const db = mongoose.connection

db.once('open', function () {
  console.log('%s has been connected.', config.mongodb)
})

db.on('error', function (err) {
  console.error('connect to %s error: ', config.mongodb, err.message)
  process.exit(1)
})

db.on('close', function () {
  console.log('数据库断开，重新连接数据库')
  mongoose.connect(config.url, {server: {auto_reconnect: true}})
})

exports.db = db
