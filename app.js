// intialize dotenv
require("dotenv").config()
// import
const express = require("express")
const app = express()
const logger = require("morgan")
const bodyParser = require("body-parser")
const RtBook = require("./src/routes/book")
const RtRent = require("./src/routes/rent")
const RtUser = require("./src/routes/user")
const cors = require("cors")

const PORT = process.env.PORT || 3020
app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`)
})
app.use(cors())
app.use(logger("dev"))
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: false
  })
)
app.use("/rentapp", RtBook)
app.use("/rentapp", RtRent)
app.use("/rentapp", RtUser)

// learn extendens
// app.get('/mygithub', (rq, rs) => {
//     rs.redirect('https://www.github.com/tejojr  ');
// })

// app.get('/mygithub', (rq, rs) => {
//     rs.sendFile('');
// })
/*
-> Learn Routing
app.get('/echo/:nama', (rq, rs) => {
    rs.send(`Route dari ${rq.params.nama}`);
});
*/

/*
->Learn Middleware
const middlewareSatu = (rq, rs, next) => {
    console.log('Midleware1');
    next();
}
const middlewareDua = (rq, rs, next) => {
    console.log('Midleware2');
    next();
}
app.use(middlewareSatu);
app.use(middlewareDua);
*/
app.get("/rentapp", (rq, rs) => {
  rs.send("Welcome to Rent Book App")
})
app.get("/", (rq, rs) => {
  rs.send("Saya Tampan")
})
