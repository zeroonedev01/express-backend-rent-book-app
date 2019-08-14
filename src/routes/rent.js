const express = require('express')
const Route = express.Router()
const CtrlRent = require('../controllers/rent')

Route
    .get('/borrow', CtrlRent.getDataBorrow)
    .post('/borrow', CtrlRent.addBorrow)
    .patch('/borrow/:idborrow', CtrlRent.returnBook)

module.exports = Route