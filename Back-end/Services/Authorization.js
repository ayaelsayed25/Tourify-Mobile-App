const JWT = require('jsonwebtoken')
const Account = require('../Models/Account.js');

// Error Messages
const SERVER_ERROR = {
    error: true,
    message: 'Something went wrong on server-side'
}
const AUTHORIZATION_HEADER_ERROR = {
    error: true,
    message: "Invalid Authorization Header"
}
const INVALID_TOKEN_ERROR = {
    error: true,
    message: "Invalid JWT Token"
}
const FORBIDDEN_ERROR = {
    error: true,
    message: "You are not permitted to perform this action"
}

function authourize(req, res, proceed) {

    if (!req.header('authorization')) {
        return res.status(401).send(AUTHORIZATION_HEADER_ERROR)
    }

    // If one exists, attempt to get the header data
    let token = req.header('authorization').split('Bearer ')[1]

    // If there's nothing after "Bearer", send an error
    if (!token) {
        return res.status(401).send(AUTHORIZATION_HEADER_ERROR)
    }

    // If there is something, attemp to decode the payload

    let decodedPayload = JWT.decode(token)

    // If there's no userId in the token payload, send an error
    if (!decodedPayload.email) {
        return res.status(401).send(INVALID_TOKEN_ERROR)
    }

    let decodedEmail = decodedPayload.email


    // let jwtSecret = "secret"
    // JWT.verify(token, jwtSecret, function (error, payload) {

    //     if (error) {

    //         return res.status(401).send(INVALID_TOKEN_ERROR)
    //     }

    //     // Set user in request object
    //     req.user = user

    //     return proceed()
    // })

    Account.findEmail(email, (err, user) => {
        if (user.email === decodedEmail)
            return proceed()
        return res.status(401).send(INVALID_TOKEN_ERROR)
    })
};