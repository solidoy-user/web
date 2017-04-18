'use strict'

const homeController = require('../controllers/controller')
const authController = require('../controllers/auth')
const auth = require('../middlewares/auth')
const productController = require('../controllers/productController')
const Product = require('../models/product')
module.exports = function (app) {
    app.get('/',homeController.index);
    app.get('/link',homeController.link);
    app.get('/private',auth, homeController.privateArea);
    app.get('/api/register',authController.signUp);
    app.get('/api/login',authController.signIn);
    app.post('/api/product', productController.insertProduct);
}
