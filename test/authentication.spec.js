const controller = require('../modules/authentication/controllers/user.controller')
const expect = require('chai').expect

let time = new Date().getTime()
let username = `username${time} `
let password = 'password'

describe('Adiciona Usuário', () => {
  it('Deve adicionar um usuário', async () => {
    let ret = await controller.insert(username, password)
    expect(ret._id).to.be.a('object')
  })
})

describe('Login', () => {
  it('Deve retornar o token de acesso', async () => {
    let ret = await controller.login(username, password)
    expect(ret.token).to.be.a('string')
  })
})
