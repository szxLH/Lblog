var mongoose = require('mongoose')
var extend = require('mongoose-schema-extend')
var config = require('config-lite')
mongoose.connect(config.mongodb)
var db = mongoose.connection
mongoose.Promise = global.Promise


db.on('error', function (err) {
    console.error('connect to %s error: ', config.mongodb, err.message)
    process.exit(1)
})

db.once('open', function () {
    console.log('%s has been connected.', config.mongodb)
})

exports.mongoose = mongoose

// var base = new mongoose.Schema({
    // //唯一键
    // _id: {type: String, unique: true},
    // //创建时间
    // _create_at: {type: Date, default: +new Date()},
    // //修改时间
    // _modify_at: {type: Date, default: +new Date()}
// })

// base.pre('create', function (next) {
//     console.log(`${this._id} will be create`)
//     this._create_at = this._create_at || new Date()
//     this._modify_at = new Date()
//     next()
// })

// exports.base = base
