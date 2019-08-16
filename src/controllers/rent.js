const modRent = require('../models/rent')
const response = require('./response')
module.exports = {
  getDataBorrow: (rq, rs) => {
    modRent.getAllBorrow()
      .then(res => response.response(rs, "Success", 200, res))
      .catch(err => console.log(err))
  },
  getBorrowbyId: (rq, rs) => {
    const idborrow = rq.params.idborrow
    modRent.getBorrowbyId(idborrow)
      .then(res => response.response(rs, "Success", 200, res))
      .catch(err => console.log(err))
  },
  // addBorrow: (rq, rs) => {
  //   const data = {
  //     id: rq.body.id,
  //     id_book: rq.body.id_book,
  //     daterent: new Date(),
  //     datereturn: rq.body.datereturn,
  //     datereturnuser: null,
  //     user_id: rq.body.user_id
  //   }
  //   const idbook = rq.body.id_book
  //   const status = 2
  //   modRent.addBorrow(data, idbook, status)
  //     .then(res => response.response(rs, res, 200))
  //     .catch(err => console.log(err))
  // },
  insertBorrow: (rq, rs) => {
    const data = {
      id: rq.body.id,
      id_book: rq.body.id_book,
      daterent: new Date(),
      datereturn: rq.body.datereturn,
      datereturnuser: null,
      user_id: rq.body.user_id
    }
    const idbook = rq.body.id_book
    const status = 2
    modRent.getBorrowbyId(data.id)
      .then(res => {
        if (res.length == 0) {
          // console.log('a')
          return modRent.getBookStatus(idbook)
        } else {
          return response.response(rs, "Id Trx duplicate", 409)
        }
      })
      .then(res => {
        if (res[0].id_status == 1) {
          // console.log('a')
          return modRent.insertBorrow(data)
        } else {
          return response.response(rs, "Book Not Available", 410)
        }
      })
      .then(res => {
        return modRent.updateStatus(status, idbook)
      })
      .then(res => response.response(rs, "Book is Successfully Booked", 200, res))
      .catch(err => console.log(err))
  },
  returnBook: (rq, rs) => {
    const idtrx = rq.params.idborrow
    const datereturn = new Date()
    const status = 1
    let idbook = null
    modRent.getBorrowbyId(idtrx)
      .then(res => {
        if (res.length > 0) {
          idbook = res[0].id_book;
          // console.log('a')
          return modRent.updateStatus(status, idbook)
        } else {
          return response.response(rs, "Id Borrow not found", 404)
        }
      })
      .then(res => {
        return modRent.updateDate(datereturn, idtrx)
      })
      .then(res => response.response(rs, "Book is Successfully Returned", 200, res))
      .catch(err => console.log(err))

  }
  // returnBook: (rq, rs) => {
  //   const datereturnuser = new Date()
  //   const idborrow = rq.params.idborrow
  //   const status = 1
  //   modRent.returnBook(idborrow, datereturnuser, status)
  //     .then(res => response.response(rs, res, 200))
  //     .catch(err => console.log(err))
  // }
}