const jwt = require('jsonwebtoken');
const miscHelper = require('./helpers');

const allowedAccess = process.env.REQUEST_HEADERS;

module.exports = {
    authorization: (req, res, next) => {
        const headerAuth = req.headers['Authorization']
        const headerSecret = req.headers['x-access-token']

        if (headerAuth !== allowedAccess) {
            return miscHelper.response(res, null, 401, 'Unauthorized!');
        } else if (typeof headerSecret === 'undefined') {
            next();
        } else {
            const bearerToken = headerSecret.split(' ')
            const token = bearerToken[1]
            req.token = token;
            console.log('Token Stored! ' + token)
            next();
        }
    }
}