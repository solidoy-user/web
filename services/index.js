'use strict'

const jwt = require('jwt-simple');
const moment = require('moment');
const config = require('../config');

function createToken(user) {

    const payload = {
        sub: user._id,
        iat:moment().unix(),
        exp:moment().add(14,'days').unix()
    }

    return jwt.encode(payload,config.SECRET_TOKEN);
}

function decodeToken(token) {
    console.log(token);
    const decoded = new Promise((resolve,reject) => {
        try {
            const payload = jwt.decode(token,config.SECRET_TOKEN);
            if(payload.exp <= moment().unix()) {
                console.log("Expired");
                reject({
                    status:401,
                    message: 'EL token ha expirado'
                });
            }
            console.log("Not Expired");
            resolve(payload.sub)
        } catch (err){
            console.log("Invalid token");
            reject({
                status: 500,
                message: 'Invalid token'
            })
        }
    });
    return decoded;
}

module.exports = {
    createToken,
    decodeToken
}