/*
 * Rotas do módulo cpfcnpj
 */
var express = require('express')
var router = express.Router()
const Controller = require('../controllers/cpfcnpj.controller')
const Auth = require('../../authentication/lib/auth')

router.get('/', Auth.ensureAuthorized, async (req, res, next) => {
  try {
    let search = req.query.search ? req.query.search : ''
    let blacklist = req.query.blacklist ? req.query.blacklist : null
    let data = await Controller.getAll(search, blacklist)
    res.status(200).json({ data })
  } catch (error) {
    console.log(error)
    res.status(400).json(error)
  }
})

router.get('/:id', Auth.ensureAuthorized, async (req, res, next) => {
  try {
    let ret = await Controller.get(req.params.id)
    res.json(ret)
  } catch (error) {
    res.status(400).json(error)
  }
})

router.post('/', Auth.ensureAuthorized, async (req, res, next) => {
  try {
    if (!req.body.value) {
      res.status(400).json('O valor é obrigatório')
    } else {
      let data = await Controller.insert(req.body)
      res.status(201).json({ data })
    }
  } catch (error) {
    console.log(error)
    res.status(400).json(error)
  }
})

router.put('/:id', Auth.ensureAuthorized, async (req, res, next) => {
  try {
    let ret = await Controller.update(req.params.id, req.body)
    res.status(204).send('')
  } catch (error) {
    console.log(error)
    res.status(400).json(error)
  }
})

router.delete('/:id', Auth.ensureAuthorized, async (req, res, next) => {
  try {
    let ret = await Controller.remove(req.params.id)
    res.status(204).send('')
  } catch (error) {
    console.log(error)
    res.status(400).json(error)
  }
})

module.exports = router
