const express = require("express")
const Route = express.Router()
const CtrlRent = require("../controllers/rent")
const auth = require("../middleware/auth")

Route.get("/borrows", auth.auth, CtrlRent.getDataBorrow)
  .get("/borrows/:idborrow", auth.auth, CtrlRent.getBorrowbyId)
  .post("/borrows", [auth.auth, auth.isAdmin], CtrlRent.insertBorrow)
  .patch("/borrows/:idborrow", [auth.auth, auth.isAdmin], CtrlRent.returnBook)

module.exports = Route
