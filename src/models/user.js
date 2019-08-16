const conn = require('../configs/db')

module.exports = {
    getUserDuplicate: (param) => {
        return new Promise((resolve, reject) => {
            conn.query(`SELECT * FROM user WHERE email = ? or username = ?`, [param.email, param.username], (err, res) => {
                if (!err) {
                    resolve(res)
                } else {
                    reject(err)
                }
            })
        })
    },
    getUserbyEmail: (param) => {
        return new Promise((resolve, reject) => {
            conn.query(`SELECT * FROM user WHERE email = ? or username = ?`, [param.username, param.username], (err, res) => {
                if (!err) {
                    resolve(res)
                } else {
                    reject(err)
                }
            })
        })
    },
    signUp: (data) => {
        return new Promise((resolve, reject) => {
            conn.query(`INSERT INTO user SET ?`, data, (err, res) => {
                if (!err) {
                    resolve(res)
                } else {
                    reject(err)
                }
            })
        })
    },
    signIn: (param) => {
        return new Promise((resolve, reject) => {
            conn.query(`SELECT * FROM user WHERE email = ? or username = ? `, [param, param], (err, res) => {
                if (!err) {
                    resolve(res)
                } else {
                    reject(err)
                }
            })
        })
    }
}