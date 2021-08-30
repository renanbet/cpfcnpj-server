const controller = require('../modules/authentication/controllers/user.controller')
const expect = require('chai').expect

let time = (new Date()).getTime()
let username = `username${time} `
let password = 'password'

describe('User Add', () => {
  it('Should add user', async () => {
    let ret = await controller.insert(username, password)
    expect(ret._id).to.be.a('object')
  })
})

describe('User login', () => {
  it('Should have user token', async () => {
    let ret = await controller.login(username, password)
    expect(ret.token).to.be.a('string')
  })
})
