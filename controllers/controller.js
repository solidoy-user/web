"use strict"

function link(req, res) {
    res.render('link', {title: 'Link'});
};

function index(req, res) {
    res.render('main',{title: 'Solidoy - Main page'});
};

function privateArea(req,res) {
    console.log("Estoy aquí");
    res.status(200).send({message: "Tienes acceso"});
}

module.exports = {
    link,
    index,
    privateArea
}