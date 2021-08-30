var jwt = require("jsonwebtoken")
const passwordHash = require('password-hash')
const TOKEN_EXP = process.env.TOKEN_EXP || 600000
const SECRET = process.env.SECRET || 'secret'

function Auth() {}

Auth.prototype.ensureAuthorized = (req, res, next) => {
  const token = req.headers["authorization"] ? req.headers["authorization"].replace("Bearer ", "") : ''
  if (token) {
    jwt.verify(token, SECRET, (err, decoded) => {
      if (err) {
        res.sendStatus(403)
      } else {
        req.authUser = decoded.user
        next()
      }
    })
  } else {
    res.sendStatus(403)
  }
}

Auth.prototype.createToken = (data) => {
	var obj = {
    data,
    exp: Math.floor(Date.now() / 1000) + parseInt(TOKEN_EXP)
  }
	return jwt.sign(obj, SECRET)
}

Auth.prototype.createPasswordHash = (password) => {
  const hash = passwordHash.generate(password)
  return hash
}

Auth.prototype.passwordCompare = (password, hash) => {
  return passwordHash.verify(password, hash)
}

module.exports = new Auth()
