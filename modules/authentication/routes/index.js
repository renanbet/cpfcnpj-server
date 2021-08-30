/*
 * Rotas do módulo authentication
 */
var express = require('express')
var router = express.Router()
const userController = require('../controllers/user.controller')

router.post('/signup', async (req, res, next) => {
  let username = req.body.username
  let password = req.body.password
  try {
    if (!username || !password) {
      res.status(400).json({
        error: 'Usuário e senha inválidos',
      })
      return
    }
    let data = await userController.insert(username, password)
    res.status(201).json({ data })
  } catch (error) {
    console.log(error)
    res.status(400).json(error)
  }
})

router.get('/', async (req, res, next) => {
  try {
    let data = await userController.getAll()
    res.json({ data })
  } catch (error) {
    console.log(error)
    res.status(400).json(error)
  }
})

router.post('/login', async (req, res, next) => {
  let username = req.body.username
  let password = req.body.password

  try {
    if (!username || !password) {
      throw { error: 'Usuário e senha inválidos' }
    }
    let data = await userController.login(username, password)
    res.status(200).json({ data })
  } catch (error) {
    console.log(error)
    res.status(400).json(error)
  }
})

module.exports = router
