const jwt = require('jsonwebtoken')

const jwt_secretToken = 'jwt_Secret1'

function auth(req, res, next) {
    const token = req.header('x-auth-token')
    // check for token
    if (!token) {
        return res.status(401).json({ msg: 'No Token' })
    }

    try {
        //verify token
        const decoded = jwt.verify(token, jwt_secretToken)
        //add user from payload
        req.user = decoded
        next()
    }
    catch (e) {
        res.status(400).json({ msg: 'Token is not valid' })
    }
}

module.exports = auth