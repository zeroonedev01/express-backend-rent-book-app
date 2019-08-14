require('dotenv').config()

const express = require('express')
const app = express()
const logger = require('morgan')
const bodyParser = require('body-parser')
const RtBook = require('./src/routes/book')
const RtRent = require('./src/routes/rent')


const port = process.env.SERVER_PORT || 3000
app.listen(port, () => {
    console.log(`Server is running on Port ${port}`)
})
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: false
}))

app.use('/rentapp', RtBook)
app.use('/rentapp', RtRent)

//learn extendens
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


app.get('/', (rq, rs) => {
    rs.send('Hello');
})