const express = require('express')
const Route = express.Router()
const CtrlBook = require('../controllers/book')
const auth = require('../middleware/auth')

Route
  .get('/book/', auth.auth, CtrlBook.getAll)
  .get('/book/:idbook', auth.auth, CtrlBook.getById)
  .post('/book', [auth.auth, auth.isAdmin], CtrlBook.addData)
  .patch('/book/:idbook', [auth.auth, auth.isAdmin], CtrlBook.editData)
  .delete('/book/:idbook', [auth.auth, auth.isAdmin], CtrlBook.deleteData)
  // .get('/book/search/:param', CtrlBook.search)
  // manage Genre
  .get('/genre', auth.auth, CtrlBook.getGenre)
  .get('/genre/:idgenre', auth.auth, CtrlBook.getGenreById)
  .post('/genre', [auth.auth, auth.isAdmin], CtrlBook.addGenre)
  .patch('/genre/:idgenre', [auth.auth, auth.isAdmin], CtrlBook.editGenre)
  .delete('/genre/:idgenre', [auth.auth, auth.isAdmin], CtrlBook.deleteGenre)

module.exports = Route