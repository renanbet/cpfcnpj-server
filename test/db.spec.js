require('dotenv').config()
var db = require('../modules/db/db')
let time = (new Date()).getTime()
db.connection(true, time)

const expect = require('chai').expect

describe('Db', () => {
  it('Should return bd status', () => {
    let connection = db.status()
    expect(connection === 'connected').to.be.true
  })
})
