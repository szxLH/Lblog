var path = require('path')
var express = require('express')
var logger = require('morgan')
var bodyParser = require('body-parser')
var config = require('config-lite')
var routes = require('./routes')
var app = express()

app.use(logger())
app.set('views', path.join(__dirname, './views'))
app.set('view engine', 'ejs')

app.use(express.static(path.join(__dirname, './public')))

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

routes(app)

app.use(function (err, req, res, next) {
  res.render('error', {
    error: err
  })
})

if (!module.parent) {
  app.listen(config.port, function () {
    console.log(`your app listen in `, config.port)
  })
}
