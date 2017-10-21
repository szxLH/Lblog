var path = require('path')
var express = require('express')
// process.env.NODE_ENV = 'production'
var morgan = require('morgan')
var logger = require('./utils/logger')
var bodyParser = require('body-parser')
var session = require('express-session')
var config = require('config-lite')
var MongoStore = require('connect-mongo')(session)
require('../models/db')
var routes = require('./routes')
var app = express()

// app.use(morgan())
app.use(morgan({stream: logger.stream}))

app.set('views', path.join(__dirname, './views'))
app.set('view engine', 'ejs')

app.use(express.static(path.join(__dirname, './public')))

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(session({
  name: 'lbolg-sid',
  resave: true, // don't save session if unmodified
  saveUninitialized: false, // don't create session until something stored
  secret: config.secret,
  cookie: { maxAge: config.CacheExpired },
  store: new MongoStore({
    url: config.mongodb
  })
}))

routes(app)

app.get('*', function (req, res, next) {
  res.render('404')
})

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
