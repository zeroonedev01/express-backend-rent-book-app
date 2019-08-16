const modUser = require('../models/user')
const response = require('./response')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
module.exports = {
    signUp: (rq, rs) => {
        const data = {
            username: rq.body.username,
            email: rq.body.email,
            password: bcrypt.hashSync(rq.body.password, 8),
            role_id: rq.body.role_id
        }
        modUser.getUserDuplicate(data)
            .then(res => {
                if (res.length == 0) {
                    console.log('a')
                    return modUser.signUp(data)
                } else {
                    return rs.json({
                        message: "Username or email already registered"
                    })
                }
            })
            .then(res => response.ok(res, rs))
            .catch(err => console.error(err))

    },
    signIn: (rq, rs) => {
        const param = rq.body.email
        const password = rq.body.password

        modUser.signIn(param)
            .then(res => {
                const dbPassword = res[0].password
                const result = bcrypt.compareSync(password, dbPassword);
                if (result) {
                    const payload = {
                        id: res[0].id,
                        role: res[0].role_id
                    }
                    let token = jwt.sign({
                        payload
                    }, process.env.SECRET_KEY, {
                        expiresIn: 60
                    })
                    rs.status(200).send({
                        auth: true,
                        accessToken: token
                    });

                } else
                    return rs.json({
                        message: "username or password is wrong"
                    })
            })
            .catch(err => console.error(err))
    }

}