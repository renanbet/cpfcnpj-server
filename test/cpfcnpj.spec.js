const controller = require('../modules/cpfcnpj/controllers/cpfcnpj.controller')
const expect = require('chai').expect

let cpfId = ''
let cnpjId = ''
let cpf = {
  value: '902.189.070-44',
  blacklist: false,
}
let cnpj = {
  value: '28.332.680/0001-60',
  blacklist: false,
}

describe('Adiciona cpf ou cnpj', () => {
  it('Deve adicionar um cpf', async () => {
    let ret = await controller.insert(cpf)
    cpfId = ret._id.toString()
    expect(ret.value === cpf.value).to.be.true
  })
  it('Deve adicionar um cnpj', async () => {
    let ret = await controller.insert(cnpj)
    cnpjId = ret._id.toString()
    expect(ret.value === cnpj.value).to.be.true
  })
})

describe('Busca cpf ou cnpj', () => {
  it('Deve buscar o cpf', async () => {
    let ret = await controller.get(cpf.value)
    expect(ret.value === cpf.value).to.be.true
    expect(ret.blacklist === cpf.blacklist).to.be.true
  })
  it('Deve buscar o cnpj', async () => {
    let ret = await controller.get(cnpj.value)
    expect(ret.value === cnpj.value).to.be.true
    expect(ret.blacklist === cnpj.blacklist).to.be.true
  })
})

describe('Existe cpf ou cnpj', () => {
  it('Deve retornar que existe o cpf', async () => {
    try {
      await controller.insert(cpf)
    } catch (err) {
      expect(err.error === 'CpfCnpj já existe!').to.be.true
    }
  })
  it('Deve retornar que existe o cnpj', async () => {
    try {
      await controller.insert(cnpj)
    } catch (err) {
      expect(err.error === 'CpfCnpj já existe!').to.be.true
    }
  })
})

describe('Atualiza cpf ou cnpj', () => {
  it('Deve atualizar o cpf', async () => {
    let newCpf = '600.586.810-19'
    await controller.update(cpfId, { value: newCpf, blacklist: true })
    let ret = await controller.get(newCpf)
    expect(ret.value === newCpf).to.be.true
    expect(ret.blacklist === true).to.be.true
    expect(ret._id.toString() === cpfId).to.be.true
  })
  it('Deve atualizar o cnpj', async () => {
    let newCnpj = '64.208.128/0001-28'
    await controller.update(cnpjId, { value: newCnpj, blacklist: true })
    let ret = await controller.get(newCnpj)
    expect(ret.value === newCnpj).to.be.true
    expect(ret.blacklist === true).to.be.true
    expect(ret._id.toString() === cnpjId).to.be.true
  })
})

describe('Cpf ou Cnpj inválido', () => {
  it('Deve retornar erro ao adicionar um cpf inválido', async () => {
    cpf.value = cpf.value.replace('.', '')
    try {
      await controller.insert(cpf)
    } catch (err) {
      expect(err.error === 'CPF inválido!').to.be.true
    }
  })
  it('Deve retornar erro ao adicionar um cnpj inválido', async () => {
    cnpj.value = cnpj.value.replace('-', '')
    try {
      await controller.insert(cnpj)
    } catch (err) {
      expect(err.error === 'CNPJ inválido!').to.be.true
    }
  })
})
