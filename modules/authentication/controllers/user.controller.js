var UserModel = require('../models/user')
const Auth = require('../lib/auth')

const insert = async (username, password) => {
  let user = await UserModel.findOne(
    {
      username,
    },
    {
      username: true,
    }
  )
  if (user != null) {
    throw { error: 'O usuário já existe!' }
  }
  let hash = Auth.createPasswordHash(password)
  let newUser = new UserModel({
    username,
    password: hash,
  })
  return await newUser.save()
}

const login = async (username, password) => {
  let user = await UserModel.findOne(
    {
      username,
    },
    {
      username: true,
      password: true,
    }
  )
  if (!user || !Auth.passwordCompare(password, user.password)) {
    throw {
      error: 'Usuário ou senha inválidos!',
    }
  }
  const tokenData = {}
  let token = Auth.createToken(tokenData)
  return {
    token,
  }
}

const getAll = async () => {
  let users = await UserModel.find(
    {},
    {
      username: true,
    }
  )
  return {
    users,
  }
}

module.exports = {
  insert,
  login,
  getAll,
}
