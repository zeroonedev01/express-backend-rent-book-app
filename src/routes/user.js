const express = require('express')
const Route = express.Router()
const CtrlUser = require('../controllers/user')

Route
  .post('/user/signup', CtrlUser.signUp)
  .post('/user/signin', CtrlUser.signIn)

module.exports = Route