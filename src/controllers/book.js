const modBook = require('../models/book')
const response = require('./response')
module.exports = {
    // Manage Books
    getAll: (rq, rs) => {
        // const sorting = rq.query.sort
        const paramUrl = {
            sorting: rq.query.sort,
            available: rq.query.available,
            search: rq.query.search
        }
        const limit = parseInt(rq.query.limit, 10) || 3
        const page = parseInt(rq.query.page, 10) || 1
        const start = (page - 1) * limit

        paramUrl.limit = limit
        paramUrl.start = start

        modBook.getDataAll(paramUrl)
            .then(res => response.response(rs, "Success", 200, res))
            .catch(err => console.log(err))
    },
    getById: (rq, rs) => {
        const idbook = rq.params.idbook
        modBook.getData(idbook)
            .then(res => response.response(rs, "Success", 200, res))
            .catch(err => console.log(err))
    },
    search: (rq, rs) => {
        const param = rq.params.param
        modBook.simpleSearch(param)
            .then(res => response.response(rs, "Success", 200, res))
            .catch(err => console.log(err))
    },
    addData: (rq, rs) => {
        const data = {
            id: rq.body.id,
            Title: rq.body.title,
            Description: rq.body.desc,
            Image: rq.body.image,
            DateReleased: new Date(),
            id_status: rq.body.available,
            id_genre: rq.body.genre
        }
        modBook.addData(data)
            .then(res => response.response(rs, "Book is Successfully Inserted", 200, res))
            .catch(err => console.log(err))
    },
    editData: (rq, rs) => {
        const idbook = rq.params.idbook
        const data = {
            Title: rq.body.title,
            Description: rq.body.desc,
            Image: rq.body.image,
            DateReleased: new Date(),
            id_status: rq.body.available,
            id_genre: rq.body.genre
        }
        modBook.editData(data, idbook)
            .then(res => response.response(rs, "Book is Successfully Edited", 200, res))
            .catch(err => console.log(err))
    },
    deleteData: (rq, rs) => {
        const idbook = rq.params.idbook
        modBook.deleteData(idbook)
            .then(res => response.response(rs, "Book is Successfully Deleted", 200, res))
            .catch(err => console.log(err))
    },

    // Manage Genre
    getGenre: (rq, rs) => {
        // const sorting = rq.query.sort
        const paramUrl = {
            sorting: rq.query.sort,
            search: rq.query.search
        }
        const limit = parseInt(rq.query.limit, 10) || 3
        const page = parseInt(rq.query.page, 10) || 1
        const start = (page - 1) * limit

        paramUrl.limit = limit
        paramUrl.start = start

        modBook.getGenre(paramUrl)
            .then(res => response.response(rs, "Success", 200, res))
            .catch(err => console.log(err))
    },
    getGenreById: (rq, rs) => {
        const idgenre = rq.params.idgenre
        modBook.getGenreById(idgenre)
            .then(res => response.response(rs, "Success", 200, res))
            .catch(err => console.log(err))
    },
    addGenre: (rq, rs) => {
        const data = {
            name: rq.body.name
        }
        modBook.addGenre(data)
            .then(res => response.response(rs, "Genre is Successfully Inserted", 200, res))
            .catch(err => console.log(err))
    },
    editGenre: (rq, rs) => {
        const idgenre = rq.params.idgenre
        const data = {
            name: rq.body.name
        }
        modBook.editGenre(data, idgenre)
            .then(res => response.response(rs, "Genre is Successfully Edited", 200, res))
            .catch(err => console.log(err))
    },
    deleteGenre: (rq, rs) => {
        const idgenre = rq.params.idgenre
        modBook.deleteGenre(idgenre)
            .then(res => response.response(rs, "Book is Successfully Deleted", 200, res))
            .catch(err => console.log(err))
    }

}