const modBook = require("../models/book")
const response = require("./response")
const { uploadImage, deleteImage } = require("../middleware/uploadImage")
module.exports = {
  // Manage Books
  getAll: (rq, rs) => {
    // const sorting = rq.query.sort
    const paramUrl = {
      sorting: rq.query.sort,
      available: rq.query.available,
      search: rq.query.search
    }
    const limit = parseInt(rq.query.limit, 10) || 1000
    const page = parseInt(rq.query.page, 10) || 1
    const start = (page - 1) * limit

    paramUrl.limit = limit
    paramUrl.start = start

    modBook
      .getDataAll(paramUrl)
      .then(res => response.response(rs, "Success", 200, res))
      .catch(err => console.log(err))
  },
  getById: (rq, rs) => {
    const idbook = rq.params.idbook
    modBook
      .getData(idbook)
      .then(res => {
        if (res.length > 0) return response.response(rs, "Success", 200, res)
        else return response.response(rs, "Data not Found", 400)
      })
      .catch(err => console.log(err))
  },
  search: (rq, rs) => {
    const param = rq.params.param
    modBook
      .simpleSearch(param)
      .then(res => response.response(rs, "Success", 200, res))
      .catch(err => console.log(err))
  },
  addData: async (rq, rs) => {
    const data = {
      title: rq.body.title,
      description: rq.body.desc,
      dateReleased: rq.body.date,
      id_status: rq.body.available,
      id_genre: rq.body.genre
    }
    data.id = await generateId()
    await modBook
      .isDuplicateTitle(data.title, data.id)
      .then(async res => {
        if (res.length == 0) {
          if (rq.file) {
            data.image = await uploadImage(rq)
          } else {
            data.image =
              "https://icon-library.net/images/no-image-available-icon/no-image-available-icon-6.jpg"
          }

          await modBook
            .addData(data)
            .then(res =>
              response.response(rs, "Book is Successfully Inserted", 200, data)
            )
            .catch(err => console.log(err))
        } else {
          return response.response(rs, "Duplicate Title or id buku", 409)
        }
      })
      .catch(err => console.log(err))
  },
  editData: (rq, rs) => {
    const idbook = rq.params.idbook
    const data = {
      title: rq.body.title,
      description: rq.body.desc,
      dateReleased: rq.body.date,
      id_status: rq.body.available,
      id_genre: rq.body.genre
    }
    // console.log(data, "cinta")
    modBook
      .getData(idbook)
      .then(async res => {
        if (res.length > 0) {
          await deleteImage(res[0].Image)
          console.log("saat ini", rq.file)
          if (rq.file) {
            data.image = await uploadImage(rq)
          }
          await modBook
            .editData(data, idbook)
            .then(res => {
              data.id = idbook
              response.response(rs, "Book is Successfully Updated", 200, data)
            })
            .catch(err => console.log(err))
        } else {
          return response.response(rs, "Invalid id book", 409)
        }
      })
      .catch(err => console.log(err))
  },
  deleteData: (rq, rs) => {
    const idbook = rq.params.idbook
    modBook
      .getData(idbook)
      .then(async res => {
        if (res.length > 0) {
          await deleteImage(res[0].Image)
          await modBook
            .deleteData(idbook)
            .then(res =>
              response.response(
                rs,
                `Book ${idbook} is Successfully Deleted`,
                200,
                { id: idbook }
              )
            )
            .catch(err => console.log(err))
        } else {
          return response.response(rs, "Invalid id book", 409)
        }
      })
      .catch(err => console.log(err))
  },

  // Manage Genre============================================
  getGenre: (rq, rs) => {
    // const sorting = rq.query.sort
    const paramUrl = {
      sorting: rq.query.sort,
      search: rq.query.search
    }
    const limit = parseInt(rq.query.limit, 10) || 9
    const page = parseInt(rq.query.page, 10) || 1
    const start = (page - 1) * limit

    paramUrl.limit = limit
    paramUrl.start = start

    modBook
      .getGenre(paramUrl)
      .then(res => response.response(rs, "Success", 200, res))
      .catch(err => console.log(err))
  },
  getGenreById: (rq, rs) => {
    const idgenre = rq.params.idgenre
    modBook
      .getGenreById(idgenre)
      .then(res => {
        if (res.length > 0) return response.response(rs, "Success", 200, res)
        else return response.response(rs, "Data not Found", 400)
      })
      .catch(err => console.log(err))
  },
  addGenre: (rq, rs) => {
    const name = rq.body.name
    const data = {
      name: rq.body.name
    }
    modBook
      .duplicateGenre(name)
      .then(res => {
        if (res.length == 0) {
          modBook
            .addGenre(data)
            .then(res => {
              data.id = res.insertId
              response.response(rs, "Genre is Successfully Inserted", 200, data)
            })
            .catch(err => console.log(err))
        } else {
          return response.response(rs, "Duplicate Genre", 409)
        }
      })
      .catch(err => console.log(err))
  },
  editGenre: (rq, rs) => {
    const idgenre = rq.params.idgenre
    const data = {
      name: rq.body.name
    }
    modBook
      .getGenreById(idgenre)
      .then(res => {
        if (res.length > 0) {
          return modBook
            .editGenre(data, idgenre)
            .then(res => {
              data.id = idgenre
              response.response(rs, "Genre is Successfully Edited", 200, data)
            })
            .catch(err => console.log(err))
        } else {
          return response.response(rs, "Genre Not Available", 404)
        }
      })
      .catch(err => console.log(err))
  },
  deleteGenre: (rq, rs) => {
    const idgenre = rq.params.idgenre
    modBook
      .getGenreById(idgenre)
      .then(res => {
        if (res.length > 0) {
          // console.log('a')
          return modBook
            .deleteGenre(idgenre)
            .then(res =>
              response.response(rs, "Book is Successfully Deleted", 200, {
                id: idgenre
              })
            )
            .catch(err => console.log(err))
        } else {
          return response.response(rs, "Genre Not Available", 404)
        }
      })
      .catch(err => console.log(err))
  },
  //manage donation=====================================================
  addDonation: async (rq, rs) => {
    const data = {
      title: rq.body.title,
      description: rq.body.desc,
      dateReleased: rq.body.date,
      id_status: 2,
      id_genre: rq.body.genre,
      id_user: rq.body.userid
    }
    data.id = await generateIdDonation()
    data.id_book = data.id
    // console.log(data)
    await modBook
      .isDuplicateTitleDonation(data.title, data.id)
      .then(async res => {
        // console.log("panjang", res.length)
        if (res.length == 0) {
          if (rq.file) {
            data.image = await uploadImage(rq)
          } else {
            data.image =
              "https://icon-library.net/images/no-image-available-icon/no-image-available-icon-6.jpg"
          }
          // console.log(data)
          await modBook
            .addDonation(data)
            .then(res =>
              response.response(rs, "Book is Successfully Inserted", 200, data)
            )
            .catch(err => console.log(err))
        } else {
          return response.response(rs, "Duplicate Title or id buku", 409)
        }
      })
      .catch(err => console.log(err))
  },
  confirmDonation: async (rq, rs) => {
    const data = {}
    const idbook = rq.params.idbook
    data.id_status = 1
    data.id_book = await generateId()
    // console.log(data)
    await modBook
      .getDonation(idbook)
      .then(res => {
        if (res.length > 0) {
          modBook
            .editDonation(data, idbook)
            .then(res =>
              modBook
                .getDonation(idbook)
                .then(res =>
                  response.response(rs, "Book Donation Confirmed", 200, res)
                )
                .catch(err => console.log(err))
            )
            .catch(err => console.log(err))
        } else {
          return response.response(rs, "Invalid id book", 409)
        }
      })

      .catch(err => console.log(err))
  },
  getAllDonation: (rq, rs) => {
    // const sorting = rq.query.sort
    const paramUrl = {
      userid: rq.query.userid,
      status: rq.query.status
    }
    modBook
      .getDataAllDonation(paramUrl)
      .then(res => response.response(rs, "Success", 200, res))
      .catch(err => console.log(err))
  }
}
const generateId = async () => {
  let result = ""
  try {
    const res = await modBook.generateId()
    if (res.length > 0) {
      id = res[0].id
      const count = parseInt(id.substr(id.length - 8, 8)) + 1
      let joinstr = "0000000" + count
      result = "BK" + joinstr.substr(joinstr.length - 8, 8)
    } else {
      result = "BK00000001"
    }
    return result
  } catch (err) {
    console.log(err)
  }
}
const generateIdDonation = async () => {
  let result = ""
  try {
    const res = await modBook.generateIdDonation()
    if (res.length > 0) {
      id = res[0].id
      const count = parseInt(id.substr(id.length - 8, 8)) + 1
      let joinstr = "0000000" + count
      result = "BD" + joinstr.substr(joinstr.length - 8, 8)
    } else {
      result = "BD00000001"
    }
    return result
  } catch (err) {
    console.log(err)
  }
}
