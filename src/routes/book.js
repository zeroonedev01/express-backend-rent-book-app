const express = require("express")
const Route = express.Router()
const CtrlBook = require("../controllers/book")
const auth = require("../middleware/auth")
const { multerUploads } = require("../middleware/multer")

Route.get("/books/", CtrlBook.getAll)
  .get("/books/:idbook", CtrlBook.getById)
  .post("/books", [auth.auth, auth.isAdmin, multerUploads], CtrlBook.addData)
  .patch(
    "/books/:idbook",
    [auth.auth, multerUploads, auth.isAdmin],
    CtrlBook.editData
  )
  .delete("/books/:idbook", [auth.auth, auth.isAdmin], CtrlBook.deleteData)
  // .get('/book/search/:param', CtrlBook.search)
  // manage Genre
  .get("/genres", CtrlBook.getGenre)
  .get("/genres/:idgenre", CtrlBook.getGenreById)
  .post("/genres", [auth.auth, auth.isAdmin], CtrlBook.addGenre)
  .patch("/genres/:idgenre", [auth.auth, auth.isAdmin], CtrlBook.editGenre)
  .delete("/genres/:idgenre", [auth.auth, auth.isAdmin], CtrlBook.deleteGenre)

module.exports = Route
