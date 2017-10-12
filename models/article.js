const mongoose = require('mongoose')
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
  create_time: {
    type: Date,
    default: new Date()
  },
  update_time: {
    type: Date,
    default: new Date()
  }
}, {
  timestamps: {
    _create_at: 'create_time',
    _update_at: 'update_time'
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

exports.ArticalModel = mongoose.model('Article', articleSchema)
