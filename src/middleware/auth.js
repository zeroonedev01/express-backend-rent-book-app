const jwt = require('jsonwebtoken')

const headerAcces = process.env.rqUEST_HEADERS
module.exports = {
    auth: (rq, rs, next) => {
        const bearerHeader = rq.headers['x-access-token']
        console.log(bearerHeader)
        if (!bearerHeader) {
            return rs.status(403).send({
                auth: false,
                message: 'No token provided.'
            });
        }

        jwt.verify(bearerHeader, process.env.SECRET_KEY, (err, decoded) => {
            if (err) {
                return rs.status(500).send({
                    auth: false,
                    message: 'Fail to Authentication. Error -> ' + err
                });
            }
            rq.userId = decoded.id;
            rq.role = decoded.role_id
            next();
        });
    },
}