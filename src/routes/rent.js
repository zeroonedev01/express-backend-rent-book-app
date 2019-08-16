const express = require('express')
const Route = express.Router()
const CtrlRent = require('../controllers/rent')
const auth = require('../middleware/auth')

Route
  .get('/borrow', auth.auth, CtrlRent.getDataBorrow)
  .get('/borrow/:idborrow', auth.auth, CtrlRent.getBorrowbyId)
  .post('/borrow', [auth.auth, auth.isAdmin], CtrlRent.insertBorrow)
  .patch('/borrow/:idborrow', [auth.auth, auth.isAdmin], CtrlRent.returnBook)

module.exports = Route