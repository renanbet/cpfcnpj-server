require('dotenv').config()
var db = require('../modules/db/db')
let time = (new Date()).getTime()
db.connection(true, time)

const expect = require('chai').expect

before((done) => {
  console.log('await db')
  new Promise((resolve) => {
    setTimeout(() => {
      resolve()
    }, 4000)
  }).then(() => {
    done()
  })
})

describe('Db', () => {
  it('Should return db status', () => {
    let connection = db.status()
    expect(connection === 'connected').to.be.true
  })
})
