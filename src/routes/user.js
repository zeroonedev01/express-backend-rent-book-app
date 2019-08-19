const express = require("express")
const Route = express.Router()
const CtrlUser = require("../controllers/user")

Route.post("/users/signup", CtrlUser.signUp).post(
  "/users/signin",
  CtrlUser.signIn
)

module.exports = Route
