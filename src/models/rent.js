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
  updateDate: (date, idborrow) => {
    return new Promise((resolve, reject) => {
      conn.query(
        `UPDATE trx_book SET datereturnuser = ? WHERE id = ?`,
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
  }
  // addBorrow: (data, idbook, status) => {
  //   return new Promise((resolve, reject) => {
  //     conn.query(
  //       `SELECT id_status from book where id = ?`,
  //       idbook,
  //       (err, res) => {
  //         if (!err) {
  //           const newidbook = res[0].id_status;
  //           if (newidbook == 1) {
  //             conn.query("INSERT INTO trx_book SET ?", data, (err, res) => {
  //               if (!err) {
  //                 conn.query(
  //                   `UPDATE book SET id_status = ? WHERE book.id = ?`,
  //                   [status, idbook],
  //                   (err, res) => {
  //                     if (!err) {
  //                       resolve("Book is Successfully Borrowed");
  //                     } else {
  //                       reject(new Error(err));
  //                     }
  //                   }
  //                 );
  //               } else {
  //                 reject(new Error(err));
  //               }
  //             });
  //           } else {
  //             resolve("This Book is Unavailable")
  //             console.log("Book NOt Available");;
  //           }
  //         } else {
  //           reject(new Error(err));
  //         }
  //       }
  //     );
  //   });
  // },
  // returnBook: (idborrow, datereturn, status) => {
  //   return new Promise((resolve, reject) => {
  //     // console.log(idborrow)
  //     conn.query(
  //       `SELECT id_book from trx_book where id = ?`,
  //       idborrow,
  //       (err, res) => {
  //         // console.log(res[0])

  //         if (!err) {
  //           const idbook = res[0].id_book;
  //           // console.log(idbook.toString())
  //           // resolve(res);
  //           conn.query(
  //             `UPDATE trx_book SET datereturnuser =? where id =?`,
  //             [datereturn, idborrow],
  //             (err, res) => {
  //               if (!err) {
  //                 console.log(idbook);
  //                 conn.query(
  //                   `UPDATE book SET id_status = ? WHERE id = ?`,
  //                   [status, idbook],
  //                   (err, res) => {
  //                     if (!err) {
  //                       resolve("Book is Successfully Returned");
  //                     } else {
  //                       reject(new Error(err));
  //                     }
  //                   }
  //                 );
  //               } else {
  //                 reject(new Error(err));
  //               }
  //             }
  //           );
  //         } else {
  //           resolve("Borrow Id failed")
  //         }
  //       }
  //     );
  //   });
  // }
}
