'use strict'

const mongoose = require('mongoose');
const User = require('../models/user');
const service = require('../services');

/**
 * SignUp method to register a user into the database
 */
function signUp(req,res) {
    const user = new User({
        email: req.body.email,
        name: req.body.name,
        lastName: req.body.lastName,
        password: req.body.password
    });

    user.save(function (err) {
        if(err) res.status(500).send({message: "Error al crear el usuario: " + err});
        res.status(200).send({message: "El usuario se ha creado correctamente",token:service.createToken(user)})
    })
}

/**
 * SignIn method to login users after registration
 */
function signIn(req,res) {
    User.find({email:req.body.email},(err,user) => {
        if(err) return res.status(500).send({message: err});
        if(!user) return res.status(404).send({message: 'No existe el usuario'});

        User.comparePassword(req.body.password,user.password,(err,isMatch) => {
            if(err) throw err;
            if(isMatch) {
                res.status(200).send({message: "Te has logueado correctamente",
                    token: service.createToken(user)});
            }
        });
    })

}

// Exports the functions
module.exports = {
    signUp,
    signIn
}