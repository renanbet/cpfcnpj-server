var mongoose = require('mongoose')

var Schema = mongoose.Schema

var CpfCnpjSchema = new Schema({
  value: String,
  blacklist: Boolean
});

module.exports = mongoose.model('CpfCnpj', CpfCnpjSchema)
