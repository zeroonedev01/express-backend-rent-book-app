const express = require("express")
const Route = express.Router()
const CtrlRent = require("../controllers/rent")
const auth = require("../middleware/auth")

Route.get("/borrows", auth.auth, CtrlRent.getDataBorrow)
  .get("/borrows/:idborrow", auth.auth, CtrlRent.getBorrowbyId)
  .post("/borrows", auth.auth, CtrlRent.insertBorrow)
  .patch("/borrows/:idborrow", auth.auth, CtrlRent.returnBook)
  .get("/borrows/borrowall/:id", auth.auth, CtrlRent.getReqAll)
  .patch("/borrows/borrowall/:id", auth.auth, CtrlRent.confirmBorAll)
  .patch("/borrows/borrowid/:id", auth.auth, CtrlRent.confirmBorOne)
  .patch("/borrows/returnall/:id", auth.auth, CtrlRent.confirmReturnAll)
  .patch("/borrows/returnid/:id", auth.auth, CtrlRent.confirmRetOne)

module.exports = Route
