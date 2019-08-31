const express = require("express")
const Route = express.Router()
const CtrlUser = require("../controllers/user")
const auth = require("../middleware/auth")

Route.post("/users/signup", CtrlUser.signUp)
  .post("/users/signin", CtrlUser.signIn)
  .get("/users/", auth.auth, CtrlUser.getData)
  .get("/users/:id", auth.auth, CtrlUser.getbyId)

module.exports = Route
