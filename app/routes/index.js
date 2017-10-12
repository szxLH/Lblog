// const shortid = require('shortid')
// const fs = require('fs')
const config = require('config-lite')
const { ArticalModel, ArticleEntity } = require('../../models/article')
// const co = require('co')
const filename = process.env.NODE_ENV === 'production' ? require('../../webpack-assets.json').main.js : 'main.bundle.js'
module.exports = function (app) {
  app.get('/', function (req, res, next) {
    res.render('index', {
      title: 'szxLH\' Blog',
      scripts: [`/${process.env.NODE_ENV === 'production' ? 'prod' : 'dev'}/${filename}`]
    })
  })

  app.get('/article/get', function (req, res, next) {
    const query = req.query && req.query.id ? {_id: req.query.id} : {}
    ArticalModel.find(query, function (err, articles) {
      if (err) {
        res.status(503)
          .send({
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
          res.status(503)
            .send({
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

  app.get('/user/get', function (req, res, next) {
    res.send({
      return_code: +!req.session.user,
      data: req.session.user
    })
  })

  app.post('/user/login', function (req, res, next) {
    const user = config.admin
    if (user.name === req.body.name && user.password === req.body.password) {
      req.session.user = req.body
      res.send({
        return_code: 0,
        data: user
      })
    } else {
      res.status(503)
        .send({
          return_code: 1,
          err_msg: '登录失败'
        })
    }
  })

  app.post('/user/logout', function (req, res, next) {
    req.session.user = null
    res.send({
      return_code: 0
    })
  })
}
