const conn = require("../configs/db")

module.exports = {
  // getAllBorrow: () => {
  //   return new Promise((resolve, reject) => {
  //     conn.query(`SELECT * FROM v_trx`, (err, res) => {
  //       if (!err) {
  //         resolve(res)
  //       } else {
  //         reject(err)
  //       }
  //     })
  //   })
  // },
  getAllBorrow: param => {
    return new Promise((resolve, reject) => {
      const userid = param.userid
      const status = param.status
      const bookid = param.bookid
      const reqname = param.reqname
      const reqstat = param.reqstatus
      // console.log(filter)
      let basicquery = `SELECT * FROM v_trx where 1 `
      if (userid != null) {
        basicquery += ` and userid= ${userid}`
      }
      if (status != null) {
        basicquery += ` and status= ${status}`
      }
      if (bookid != null) {
        basicquery += ` and bookid= ${bookid}`
      }
      if (reqname != null) {
        basicquery += ` and req_name= '${reqname}'`
      }
      if (reqstat != null) {
        basicquery += ` and req_stat= '${reqstat}'`
      }
      console.log("==" + basicquery)
      conn.query(basicquery, (err, rs) => {
        if (!err) {
          resolve(rs)
        } else {
          reject(err)
        }
      })
    })
  },
  getBorrowbyId: idborrow => {
    return new Promise((resolve, reject) => {
      conn.query(`SELECT * FROM v_trx where id = ?`, idborrow, (err, res) => {
        if (!err) {
          resolve(res)
        } else {
          reject(err)
        }
      })
    })
  },
  getBookId: idborrow => {
    return new Promise((resolve, reject) => {
      conn.query(`SELECT * FROM v_trx bookid = ?`, idborrow, (err, res) => {
        if (!err) {
          resolve(res)
        } else {
          reject(err)
        }
      })
    })
  },
  getBookStatus: idbook => {
    return new Promise((resolve, reject) => {
      conn.query(
        `SELECT id_status from book where id = ?`,
        idbook,
        (err, res) => {
          if (!err) {
            resolve(res)
          } else {
            reject(err)
          }
        }
      )
    })
  },
  insertBorrow: data => {
    return new Promise((resolve, reject) => {
      console.log("sayang", data)
      conn.query(`INSERT INTO trx_book SET ?`, data, (err, res) => {
        if (!err) {
          resolve(res)
        } else {
          reject(err)
        }
      })
    })
  },
  updateStatus: (status, idbook) => {
    return new Promise((resolve, reject) => {
      conn.query(
        `UPDATE book SET id_status = ? WHERE book.id = ?`,
        [status, idbook],
        (err, res) => {
          if (!err) {
            resolve(res)
          } else {
            reject(new Error(err))
          }
        }
      )
    })
  },
  updateStatus1: (status, idbook) => {
    return new Promise((resolve, reject) => {
      conn.query(
        `UPDATE book SET id_status = ? WHERE id in(?)`,
        [status, idbook],
        (err, res) => {
          if (!err) {
            resolve(res)
          } else {
            reject(new Error(err))
          }
        }
      )
    })
  },
  updateDate: (date, idborrow) => {
    return new Promise((resolve, reject) => {
      conn.query(
        `UPDATE trx_book SET datereturnuser = ?, req_name='return', req_stat='pending' WHERE id = ?`,
        [date, idborrow],
        (err, res) => {
          if (!err) {
            resolve(res)
          } else {
            reject(new Error(err))
          }
        }
      )
    })
  },

  getReqAll: id => {
    return new Promise((resolve, reject) => {
      conn.query(
        `SELECT * FROM v_trx where req_stat = 'pending' and userid = ?`,
        id,
        (err, res) => {
          if (!err) {
            resolve(res)
          } else {
            reject(err)
          }
        }
      )
    })
  },
  //borow manage
  getReqBorrowbyId: id => {
    return new Promise((resolve, reject) => {
      conn.query(
        `SELECT * FROM v_trx where req_name = 'borrow' and req_stat = 'pending' and id = ?`,
        id,
        (err, res) => {
          if (!err) {
            resolve(res)
          } else {
            reject(err)
          }
        }
      )
    })
  },
  getReqBorrowAllbyId: id => {
    return new Promise((resolve, reject) => {
      conn.query(
        `SELECT * FROM v_trx where req_name = 'borrow' and req_stat = 'pending' and userid = ?`,
        id,
        (err, res) => {
          if (!err) {
            resolve(res)
          } else {
            reject(err)
          }
        }
      )
    })
  },

  editReqBorrowAll: id => {
    return new Promise((resolve, reject) => {
      conn.query(
        `UPDATE trx_book set req_stat='complete' where req_name = 'borrow' and req_stat='pending' and user_id=?`,
        id,
        (err, res) => {
          if (!err) {
            resolve(res)
          } else {
            reject(err)
          }
        }
      )
    })
  },
  editReqBorrowbyId: id => {
    return new Promise((resolve, reject) => {
      conn.query(
        `UPDATE trx_book set req_stat='complete' where req_name = 'borrow' and req_stat='pending' and id=?`,
        id,
        (err, res) => {
          if (!err) {
            resolve(res)
          } else {
            reject(err)
          }
        }
      )
    })
  },
  //return manage
  getReqReturnbyId: id => {
    return new Promise((resolve, reject) => {
      conn.query(
        `SELECT * FROM v_trx where req_name = 'return' and req_stat = 'pending' and id = ?`,
        id,
        (err, res) => {
          if (!err) {
            resolve(res)
          } else {
            reject(err)
          }
        }
      )
    })
  },
  getReqReturnAllbyId: id => {
    return new Promise((resolve, reject) => {
      conn.query(
        `SELECT * FROM v_trx where req_name = 'return' and req_stat = 'pending' and userid = ?`,
        id,
        (err, res) => {
          if (!err) {
            resolve(res)
          } else {
            reject(err)
          }
        }
      )
    })
  },
  editReqReturnAll: id => {
    return new Promise((resolve, reject) => {
      conn.query(
        `UPDATE trx_book set req_stat='complete' where req_name = 'return' and req_stat='pending' and user_id=?`,
        id,
        (err, res) => {
          if (!err) {
            resolve(res)
          } else {
            reject(err)
          }
        }
      )
    })
  },
  editReqReturnbyId: id => {
    return new Promise((resolve, reject) => {
      conn.query(
        `UPDATE trx_book set req_stat='complete' where req_name = 'return' and req_stat='pending' and id=?`,
        id,
        (err, res) => {
          if (!err) {
            resolve(res)
          } else {
            reject(err)
          }
        }
      )
    })
  }
}
