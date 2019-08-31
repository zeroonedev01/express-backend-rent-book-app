const jwt = require("jsonwebtoken")
const response = require("../controllers/response")

// const headerAcces = process.env.REQUEST_HEADERS
const key = process.env.SECRET_KEY
module.exports = {
  auth: (rq, rs, next) => {
    const bearerHeader = rq.headers["x-access-token"]
    console.log(bearerHeader)
    if (!bearerHeader) {
      return response.response(rs, "No token provided", 403)
    }
    jwt.verify(bearerHeader, key, (err, decoded) => {
      if (err) {
        return response.response(
          rs,
          "Fail to Authentication. Error -> " + err,
          500
        )
      }
      rq.userId = decoded.id
      rq.role = decoded.role
      rq.email = decoded.email
      // console.log('a' + decoded.id)
      next()
    })
  },
  isAdmin: (rq, rs, next) => {
    const userRole = rq.role
    console.log(userRole)
    if (userRole.toLowerCase() == "admin") {
      next()
    } else {
      return response.response(rs, "'Require Admin Role!", 403)
    }
  }
}
