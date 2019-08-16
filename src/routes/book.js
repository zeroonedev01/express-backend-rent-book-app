const express = require('express')
const Route = express.Router()
const CtrlBook = require('../controllers/book')
const auth = require('../middleware/auth')

Route
    .get('/book/*', auth.auth, CtrlBook.getAll)
    .get('/book/:idbook', CtrlBook.getById)
    .post('/book', CtrlBook.addData)
    .patch('/book/:idbook', CtrlBook.editData)
    .delete('/book/:idbook', CtrlBook.deleteData)
    // .get('/book/search/:param', CtrlBook.search)
    //manage Genre
    .get('/genre', CtrlBook.getGenre)
    .get('/genre/:idgenre', CtrlBook.getGenreById)
    .post('/genre', CtrlBook.addGenre)
    .patch('/genre/:idgenre', CtrlBook.editGenre)
    .delete('/genre/:idgenre', CtrlBook.deleteGenre)

module.exports = Route