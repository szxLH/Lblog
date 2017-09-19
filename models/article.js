// var db = require('./db'),
//     mongoose = db.mongoose,
//     Schema = mongoose.Schema,
//     base = db.base
const mongoose = require('./db').mongoose
const Schema = mongoose.Schema

var articleSchema = new Schema({
  title: String,
  author: String,
  visits: {
    type: Number,
    default: 0
  },
  stars: {
    type: Number,
    default: 0
  },
  comments: {
    type: Number,
    default: 0
  },
  type: String,
  introduction: String,
  content: String,
  _create_at: {
    type: Date,
    default: new Date()
  },
  _modify_at: {
    type: Date,
    default: new Date()
  }
})

exports.ArticleEntity = {
  title: '',
  author: 'szxLH',
  visits: 0,
  stars: 0,
  comments: 0,
  type: '999',
  introduction: '',
  content: ''
}

// articleSchema.pre('insertMany', function (next, a) {
//   console.log('will save===================',this)
//   console.log('next===================', next)
//   console.log('aaaaaa===================',a)
//   this._create_at = new Date()
//   this._modify_at = new Date()
//   next()
// })

 exports.ArticalModel = mongoose.model('Article', articleSchema)