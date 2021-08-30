var mongoose = require('mongoose')

var Schema = mongoose.Schema

var CounterSchema = new Schema({
  value: String,
  count: Number
})

module.exports = mongoose.model('Counter', CounterSchema)
