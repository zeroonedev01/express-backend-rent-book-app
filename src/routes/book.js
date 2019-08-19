const express = require("express")
const Route = express.Router()
const CtrlBook = require("../controllers/book")
const auth = require("../middleware/auth")

Route.get("/books/", auth.auth, CtrlBook.getAll)
  .get("/books/:idbook", auth.auth, CtrlBook.getById)
  .post("/books", [auth.auth, auth.isAdmin], CtrlBook.addData)
  .patch("/books/:idbook", [auth.auth, auth.isAdmin], CtrlBook.editData)
  .delete("/books/:idbook", [auth.auth, auth.isAdmin], CtrlBook.deleteData)
  // .get('/book/search/:param', CtrlBook.search)
  // manage Genre
  .get("/genres", auth.auth, CtrlBook.getGenre)
  .get("/genres/:idgenre", auth.auth, CtrlBook.getGenreById)
  .post("/genres", [auth.auth, auth.isAdmin], CtrlBook.addGenre)
  .patch("/genres/:idgenre", [auth.auth, auth.isAdmin], CtrlBook.editGenre)
  .delete("/genres/:idgenre", [auth.auth, auth.isAdmin], CtrlBook.deleteGenre)

module.exports = Route
