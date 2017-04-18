"use strict"
const homeController = require('../controllers/controller');
const authController = require('../controllers/auth');
const auth = require('../middlewares/auth');
module.exports = function (app) {
    app.get('/',homeController.index);
    app.get('/link',homeController.link);
    app.get('/private',auth,homeController.privateArea);
    app.post('/api/register',authController.signUp);
    app.post('/api/login',authController.signIn);
}