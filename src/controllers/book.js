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
      .then(res => response.response(rs, "Success", 200, res))
      .catch(err => console.log(err))
  },
  search: (rq, rs) => {
    const param = rq.params.param
    modBook
      .simpleSearch(param)
      .then(res => response.response(rs, "Success", 200, res))
      .catch(err => console.log(err))
  },
  addData: (rq, rs) => {
    const data = {
      id: rq.body.id,
      title: rq.body.title,
      description: rq.body.desc,
      dateReleased: rq.body.date,
      id_status: rq.body.available,
      id_genre: rq.body.genre
    }
    modBook
      .isDuplicateTitle(data.title, data.id)
      .then(async res => {
        if (res.length == 0) {
          if (rq.file) {
            data.image = await uploadImage(rq)
          } else {
            data.image =
              "https://icon-library.net/images/no-image-available-icon/no-image-available-icon-6.jpg"
          }
          console.log(data)
          return await modBook.addData(data)
        } else {
          return response.response(rs, "Duplicate Title or id buku", 409)
        }
      })
      .then(res =>
        response.response(rs, "Book is Successfully Inserted", 200, data)
      )
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
    console.log(data, "cinta")
    modBook
      .getData(idbook)
      .then(async res => {
        if (res.length > 0) {
          await deleteImage(res[0].Image)
          console.log("saat ini", rq.file)
          if (rq.file) {
            data.image = await uploadImage(rq)
          }
          return await modBook.editData(data, idbook)
        } else {
          return response.response(rs, "Invalid id book", 409)
        }
      })
      .then(res =>
        response.response(rs, "Book is Successfully Updated", 200, res)
      )
      .catch(err => console.log(err))
  },
  deleteData: (rq, rs) => {
    const idbook = rq.params.idbook
    modBook
      .getData(idbook)
      .then(async res => {
        if (res.length > 0) {
          await deleteImage(res[0].Image)
          return await modBook.deleteData(idbook)
        } else {
          return response.response(rs, "Invalid id book", 409)
        }
      })
      .then(res =>
        response.response(rs, "Book is Successfully Deleted", 200, res)
      )
      .catch(err => console.log(err))
  },

  // Manage Genre
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
      .then(res => response.response(rs, "Success", 200, res))
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
          // console.log('a')
          return modBook.addGenre(data)
        } else {
          return response.response(rs, "Duplicate Genre", 409)
        }
      })
      .then(res =>
        response.response(rs, "Genre is Successfully Inserted", 200, res)
      )
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
          console.log("a")
          return modBook.editGenre(data, idgenre)
        } else {
          return response.response(rs, "Genre Not Available", 404)
        }
      })
      .then(res =>
        response.response(rs, "Genre is Successfully Edited", 200, res)
      )
      .catch(err => console.log(err))
  },
  deleteGenre: (rq, rs) => {
    const idgenre = rq.params.idgenre
    modBook
      .getGenreById(idgenre)
      .then(res => {
        if (res.length > 0) {
          // console.log('a')
          return modBook.deleteGenre(idgenre)
        } else {
          return response.response(rs, "Genre Not Available", 404)
        }
      })
      .then(res =>
        response.response(rs, "Book is Successfully Deleted", 200, res)
      )
      .catch(err => console.log(err))
  }
}
