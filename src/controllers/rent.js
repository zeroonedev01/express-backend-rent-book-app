const modRent = require('../models/rent')
const response = require('./response')
module.exports = {
    getDataBorrow: (rq, rs) => {
        modRent.getAllBorrow()
            .then(result => rs.json(result))
            .catch(err => console.log(err))
    },

    addBorrow: (rq, rs) => {
        const data = {
            id: rq.body.id,
            id_book: rq.body.id_book,
            daterent: new Date(),
            datereturn: rq.body.datereturn,
            datereturnuser: rq.body.datereturnuser
        }
        const idbook = rq.body.id_book
        const status = 2
        modRent.addBorrow(data, idbook, status)
            .then(res => response.ok(res, rs))
            .catch(err => console.log(err))
    },
    returnBook: (rq, rs) => {
        const datereturnuser = new Date()
        const idborrow = rq.params.idborrow
        const status = 1
        modRent.returnBook(idborrow, datereturnuser, status)
            .then(res => response.ok(res, rs))
            .catch(err => console.log(err))
    }
}