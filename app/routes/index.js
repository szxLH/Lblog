const shortid = require('shortid')
const fs = require('fs')
const { ArticalModel, ArticleEntity } = require('../../models/article')
const co = require('co')
module.exports = function (app) {
  app.get('/', function (req, res, next) {
    res.render('index', {
      title: 'szxLH\' Blog'
    })
  })

  app.get('/article/get', function (req, res, next) {
    const query = req.query && req.query.id ? {_id: req.query.id} : {}
    ArticalModel.find(query, function (err, articles) {
      if (err) {
        res.status = 503
        res.send({
          return_code: 1,
          data: [],
          err_msg: err.message
        })
      } else {
        res.send({
          return_code: 0,
          data: articles
        })
      }
    })
  })

  app.post('/article/update', function (req, res, next) {
    if (req.body && Object.keys(req.body).length) {
      const article = Object.assign({}, ArticleEntity, req.body)
      ArticalModel.collection.insert(article, function (err, result) {
        if (err) {
          res.status = 503
          res.send({
            return_code: 1,
            data: [],
            err_msg: err.message
          })
        } else {
          res.send({
            return_code: 0,
            data: result
          })
        }
      })
    }
  })

  app.get(function (req, res, next) {
    res.render('404')
  })
}
