const CpfCnpjModel = require('../models/cpfcnpj.model')
const Cpf = require('../lib/cpf')
const Cnpj = require('../lib/cnpj')

const get = async (value) => {
  let cpfCnpj = await CpfCnpjModel.findOne(
    {
      value,
    },
    {
      value: true,
      blacklist: true,
    }
  )
  return cpfCnpj
}

const getAll = async (search = '', blacklist = null) => {
  if (search) {
    if (search.length < 15) {
      let cpf = new Cpf(search)
      if (!cpf.validate()) {
        throw { error: 'CPF inválido!' }
      }
    } else {
      let cnpj = new Cnpj(search)
      if (!cnpj.validate()) {
        throw { error: 'CNPJ inválido!' }
      }
    }
  }
  let filter = {}
  if (search) {
    filter['value'] = search
  }
  if (blacklist !== null) {
    filter['blacklist'] = blacklist
  }
  let cpfCnpjs = await CpfCnpjModel.find(filter, {
    value: true,
    blacklist: true,
  })
  return cpfCnpjs
}

const insert = async (cpfCnpj) => {
  if (cpfCnpj.value.length < 15) {
    let cpf = new Cpf(cpfCnpj.value)
    if (!cpf.validate()) {
      throw { error: 'CPF inválido!' }
    }
  } else {
    let cnpj = new Cnpj(cpfCnpj.value)
    if (!cnpj.validate()) {
      throw { error: 'CNPJ inválido!' }
    }
  }

  let data = await CpfCnpjModel.findOne(
    {
      value: cpfCnpj.value,
    },
    {
      value: true,
    }
  )
  if (data != null) {
    throw { error: 'CpfCnpj já existe!' }
  }
  /*
   * Atribui blacklist = false caso não informado
   */
  let newCpfCnpj = new CpfCnpjModel(cpfCnpj)
  newCpfCnpj.blacklist = newCpfCnpj.blacklist ? newCpfCnpj.blacklist : false
  newCpfCnpj.date = new Date()

  let result = await newCpfCnpj.save()
  return result
}

const update = async (id, cpfCnpj) => {
  const filter = { _id: id }
  const update = cpfCnpj
  let result = await CpfCnpjModel.findOneAndUpdate(filter, update)
  return result
}

const remove = async (id) => {
  return await CpfCnpjModel.deleteOne({ _id: id })
}

module.exports = {
  get,
  getAll,
  insert,
  update,
  remove,
}
