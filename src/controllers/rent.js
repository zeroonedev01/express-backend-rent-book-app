const modRent = require("../models/rent")
const response = require("./response")
module.exports = {
  // getDataBorrow: (rq, rs) => {
  //   modRent
  //     .getAllBorrow()
  //     .then(res => response.response(rs, "Success", 200, res))
  //     .catch(err => console.log(err))
  // },
  getDataBorrow: (rq, rs) => {
    // const sorting = rq.query.sort
    const paramUrl = {
      userid: rq.query.userid,
      status: rq.query.status,
      bookid: rq.query.bookid,
      reqname: rq.query.rname,
      reqstatus: rq.query.rstatus
    }
    modRent
      .getAllBorrow(paramUrl)
      .then(res => response.response(rs, "Success", 200, res))
      .catch(err => console.log(err))
  },
  getBorrowbyId: (rq, rs) => {
    const idborrow = rq.params.idborrow
    modRent
      .getBorrowbyId(idborrow)
      .then(res => {
        if (res.length > 0) return response.response(rs, "Success", 200, res)
        else return response.response(rs, "Data not Found", 400)
      })
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
      // id: rq.body.id,
      id_book: rq.body.id_book,
      daterent: new Date(),
      datereturn: rq.body.datereturn,
      datereturnuser: null,
      user_id: rq.body.user_id,
      req_name: "borrow",
      req_stat: "pending"
    }
    const idbook = rq.body.id_book
    const status = 2
    modRent
      .getBookStatus(idbook)
      .then(async res => {
        if (res[0].id_status == 1) {
          console.log(data)
          return await modRent.insertBorrow(data)
        } else {
          return response.response(rs, "Book Not Available", 410)
        }
      })
      .then(res => {
        return modRent.updateStatus(status, idbook)
      })
      .then(res =>
        response.response(rs, "Borrow Request Successfully", 200, res)
      )
      .catch(err => console.log(err))
  },
  returnBook: (rq, rs) => {
    const idtrx = rq.params.idborrow
    const datereturn = new Date()
    modRent
      .getBorrowbyId(idtrx)
      .then(res => {
        if (res.length > 0) {
          return modRent.updateDate(datereturn, idtrx)
        } else {
          return response.response(rs, "Id Borrow not found", 404)
        }
      })
      .then(res => response.response(rs, "Return request success", 200, res))
      .catch(err => console.log(err))
  },
  //getReqAll
  getReqAll: (rq, rs) => {
    const iduser = rq.params.id
    modRent
      .getReqAll(iduser)
      .then(res => response.response(rs, "Success", 200, res))
      .catch(err => console.log(err))
  },
  //setting borrow request
  getBorAllbyId: (rq, rs) => {
    const iduser = rq.params.id
    modRent
      .getReqBorrowAllbyId(iduser)
      .then(res => response.response(rs, "Success", 200, res))
      .catch(err => console.log(err))
  },
  confirmBorAll: (rq, rs) => {
    const iduser = rq.params.id
    modRent
      .getReqBorrowAllbyId(iduser)
      .then(res => {
        if (res.length > 0) {
          return modRent.editReqBorrowAll(iduser)
        } else {
          return response.response(rs, "Request Not Found", 404)
        }
      })
      .then(res =>
        response.response(rs, "All borrow request accepted", 200, res)
      )
      .catch(err => console.log(err))
  },
  confirmBorOne: (rq, rs) => {
    const id = rq.params.id
    modRent
      .getReqBorrowbyId(id)
      .then(res => {
        if (res.length > 0) {
          return modRent.editReqBorrowbyId(id)
        } else {
          return response.response(rs, "Request Not Found", 404)
        }
      })
      .then(res => response.response(rs, "borrow request accepted", 200, res))
      .catch(err => console.log(err))
  },
  //setting Return request
  getReturnAllbyId: (rq, rs) => {
    const iduser = rq.params.id
    modRent
      .getReqReturnAllbyId(iduser)
      .then(res => response.response(rs, "Success", 200, res))
      .catch(err => console.log(err))
  },
  confirmReturnAll: (rq, rs) => {
    const iduser = rq.params.id
    const status = 1
    let idbook = []
    modRent
      .getReqReturnAllbyId(iduser)
      .then(res => {
        if (res.length > 0) {
          res.map((book, i) => {
            idbook.push(book.bookid)
            console.log("ID BOOK", book.bookid)
          })
          console.log("ID BOOK1", idbook)
          return modRent.updateStatus1(status, idbook)
        } else {
          return response.response(rs, "Request Not Found", 404)
        }
      })
      .then(res => {
        return modRent.editReqReturnAll(iduser)
      })
      .then(res =>
        response.response(rs, "All return request accepted", 200, res)
      )
      .catch(err => console.log(err))
  },
  confirmRetOne: (rq, rs) => {
    const id = rq.params.id
    const status = 1
    let idbook = null
    modRent
      .getReqReturnbyId(id)
      .then(res => {
        if (res.length > 0) {
          idbook = res[0].bookid
          console.log("ID BOOK", idbook)
          return modRent.updateStatus(status, idbook)
        } else {
          return response.response(rs, "Request Not Found", 404)
        }
      })
      .then(res => {
        return modRent.editReqReturnbyId(id)
      })
      .then(res => response.response(rs, "return request accepted", 200, res))
      .catch(err => console.log(err))
  }
}
