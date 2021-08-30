/*
 * Arquivo de definições da aplicação
 */
var createError = require('http-errors')
var express = require('express')
var path = require('path')
var cookieParser = require('cookie-parser')
var logger = require('morgan')
require('dotenv').config()

// Rotas da aplicação
var users = require('./modules/authentication/routes')
var cpfcnpj = require('./modules/cpfcnpj/routes')
var status = require('./modules/status/routes')

var app = express()

// Habilita o CORS
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-Requested-With,content-type, Authorization'
  )
  res.setHeader('Content-Type', 'application/json; charset=utf-8')
  next()
})

// Configurações
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

// Path das Rotas da aplicação
app.use('/', status)
app.use('/status', status)
app.use('/users', users)
app.use('/cpfcnpj', cpfcnpj)

// catch 404
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
  res.status(err.status || 500)
  res.json(err.message)
})

module.exports = app
