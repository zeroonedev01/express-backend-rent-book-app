const conn = require("../configs/db")
const nameColumns = ["title", "datereleased", "genre"]
const nameGen = ["name"]

module.exports = {
  // manage book
  getDataAll: param => {
    return new Promise((resolve, reject) => {
      const sort = param.sorting
      const available = param.available
      const search = param.search

      console.log(param)
      let basicquery = `SELECT * FROM v_book where 1 `
      if (available != null) {
        basicquery += ` AND available = '${available}'`
      }
      if (search != null) {
        basicquery += ` AND title like  '%${search}%' or genre like '%${search}%'`
      }
      if (sort != null) {
        let [col, order] = sort.split(":")
        // console.log(order)
        if (order === undefined) {
          order = "asc"
        }
        if (!nameColumns.includes(col)) {
          resolve("Only can sort Title, Date Release, and Genre")
          return
        }
        if (order !== "asc" && order !== "desc") {
          resolve("Invalid sort order")
          return
        }

        basicquery += ` ORDER BY ${col} ${order}`
      }
      basicquery += ` limit ${param.start},${param.limit}  `
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
  getData: idbook => {
    return new Promise((resolve, reject) => {
      conn.query(`SELECT * from v_book where id =?`, idbook, (err, rs) => {
        if (!err) {
          resolve(rs)
        } else {
          reject(err)
        }
      })
    })
  },
  isDuplicateTitle: (title, id) => {
    return new Promise((resolve, reject) => {
      conn.query(
        `SELECT * from v_book where title =? or id=?`,
        [title, id],
        (err, rs) => {
          if (!err) {
            resolve(rs)
          } else {
            reject(err)
          }
        }
      )
    })
  },
  isDuplicateTitleDonation: (title, id) => {
    return new Promise((resolve, reject) => {
      conn.query(
        `SELECT * from donationbook where title =? or id=?`,
        [title, id],
        (err, rs) => {
          if (!err) {
            resolve(rs)
          } else {
            reject(err)
          }
        }
      )
    })
  },
  addData: data => {
    return new Promise((resolve, reject) => {
      conn.query(`INSERT INTO book SET ?`, data, (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(err)
        }
      })
    })
  },
  editData: (data, idbook) => {
    return new Promise((resolve, reject) => {
      conn.query(
        `UPDATE book set ? where id = ?`,
        [data, idbook],
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
  deleteData: idbook => {
    return new Promise((resolve, reject) => {
      conn.query(`DELETE FROM book WHERE id = ?`, idbook, (err, res) => {
        if (!err) {
          resolve(res)
        } else {
          reject(err)
        }
      })
    })
  },
  // manage Genre
  getGenre: param => {
    return new Promise((resolve, reject) => {
      const sort = param.sorting
      const search = param.search

      console.log(param)
      let basicquery = `SELECT * FROM genre where 1 `
      if (search != null) {
        basicquery += ` AND name like  '%${search}%'`
      }
      if (sort != null) {
        let [col, order] = sort.split(":")
        // console.log(order)
        if (order === undefined) {
          order = "asc"
        }
        if (!nameGen.includes(col)) {
          resolve("Only can sort name")
          return
        }
        if (order !== "asc" && order !== "desc") {
          resolve("Invalid sort order")
          return
        }

        basicquery += ` ORDER BY ${col} ${order}`
      }
      basicquery += ` limit ${param.start},${param.limit}  `
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
  getGenreById: idgenre => {
    return new Promise((resolve, reject) => {
      conn.query(`SELECT * FROM Genre WHERE id =?`, idgenre, (err, rs) => {
        if (!err) {
          resolve(rs)
        } else {
          reject(err)
        }
      })
    })
  },
  addGenre: name => {
    return new Promise((resolve, reject) => {
      conn.query(`INSERT INTO genre SET ?`, name, (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(err)
        }
      })
    })
  },
  editGenre: (data, idgenre) => {
    return new Promise((resolve, reject) => {
      conn.query(
        `UPDATE genre set ? where id = ?`,
        [data, idgenre],
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
  deleteGenre: idgenre => {
    return new Promise((resolve, reject) => {
      conn.query(`DELETE FROM genre WHERE id = ?`, idgenre, (err, res) => {
        if (!err) {
          resolve(res)
        } else {
          reject(err)
        }
      })
    })
  },
  duplicateGenre: data => {
    return new Promise((resolve, reject) => {
      conn.query(`SELECT * FROM Genre where name = ?`, data, (err, res) => {
        if (!err) {
          resolve(res)
        } else {
          reject(err)
        }
      })
    })
  },
  //manageDonation
  addDonation: data => {
    return new Promise((resolve, reject) => {
      conn.query(`INSERT INTO donationbook SET ?`, data, (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(err)
        }
      })
    })
  },
  editDonation: (data, idbook) => {
    return new Promise((resolve, reject) => {
      conn.query(
        `UPDATE donationbook set ? where id = ?`,
        [data, idbook],
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
  getDonation: idbook => {
    return new Promise((resolve, reject) => {
      conn.query(
        `SELECT * from donationbook where id =?`,
        idbook,
        (err, rs) => {
          if (!err) {
            resolve(rs)
          } else {
            reject(err)
          }
        }
      )
    })
  },
  getDataAllDonation: param => {
    return new Promise((resolve, reject) => {
      const userid = param.userid
      const status = param.status

      console.log(param)
      let basicquery = `SELECT * FROM donationbook where 1 `
      if (userid != null) {
        basicquery += ` AND id_user = ${userid}`
      }
      if (status != null) {
        basicquery += ` AND id_status = ${status}`
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
  generateId: () => {
    return new Promise((resolve, reject) => {
      conn.query(
        `SELECT id FROM book WHERE id in (select max(id) from book) order by id desc`,
        (err, rs) => {
          if (!err) {
            resolve(rs)
          } else {
            reject(err)
          }
        }
      )
    })
  },
  generateIdDonation: () => {
    return new Promise((resolve, reject) => {
      conn.query(
        `SELECT id FROM donationbook WHERE id in (select max(id) from donationbook) order by id desc`,
        (err, rs) => {
          if (!err) {
            resolve(rs)
          } else {
            reject(err)
          }
        }
      )
    })
  }
}
