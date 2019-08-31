const express = require("express")
const Route = express.Router()
const CtrlRent = require("../controllers/rent")
const auth = require("../middleware/auth")

Route.get("/borrows", auth.auth, CtrlRent.getDataBorrow)
  .get("/borrows/:idborrow", auth.auth, CtrlRent.getBorrowbyId)
  .post("/borrows", auth.auth, CtrlRent.insertBorrow)
  .patch("/borrows/:idborrow", auth.auth, CtrlRent.returnBook)

module.exports = Route
