"use strict"

const homeController = require('../controllers/HomeController');
const authController = require('../controllers/authController');
const passport = require('passport');
module.exports = function (app) {
    app.get('/',homeController.index);
    app.get('/link',homeController.link);
    app.get('/private',passport.authenticate('jwt',{session:false}), homeController.privateArea);
    app.get('/register',homeController.register);
    app.post('/register',authController.signUp);
    app.get('/login',homeController.login);
    app.post('/login',authController.signIn);
}