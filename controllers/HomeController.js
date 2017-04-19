"use strict"

function link(req, res) {
    res.render('link', {title: 'Link'});
};

function index(req, res) {
    res.render('main',{title: 'Solidoy - Main page'});
};

function privateArea(req,res) {
    res.status(200).send({message: "Tienes acceso y eso",user: {
        email: req.user.email,
        fullName: req.user.firstName + " " + req.user.lastName
    }});
}

function register(req,res) {
    res.render('signUp',{title: 'Registration Form'});
}

function login(req,res) {
    res.render('login',{title: 'Login Form'});
}

module.exports = {
    link,
    index,
    privateArea,
    register,
    login
}