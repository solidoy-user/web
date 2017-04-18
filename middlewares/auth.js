'use strict'

const service = require('../services');

function isAuth(req,res,next) {
    if(!req.headers.authorization) {
        return res.status(403).send({message: "No tienes autorización"})
    }

    // Grab the token and decode it
    console.log("In the middleware");
    const token = req.headers.authorization;
    console.log(token);
    service.decodeToken(token)
        .then(response  => {
            req.user = response;
            console.log(req.user);
            next()
        })
        .catch(response => {
            res.status(response.status)
        })
}

module.exports = isAuth;
