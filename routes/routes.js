'use strict'

const homeController = require('../controllers/controller')
const authController = require('../controllers/auth')
const auth = require('../middlewares/auth')
const Product = require('../models/product')
module.exports = function (app) {
    app.get('/',homeController.index);
    app.get('/link',homeController.link);
    app.get('/private',auth, homeController.privateArea);
    app.get('/api/register',authController.signUp);
    app.get('/api/login',authController.signIn);
    app.post('/api/product', (req,res) => {
      console.log('POST /api/product')
      console.log(req.body)
      let product = new Product()
      product.title = req.body.title
      product.picture = req.body.images
      product.category = req.body.category
      product.description = req.body.description

      product.save((err,productStored) => {
        if(err) res.status(500).send({message: `Error al guardar el producto: ${err}`})
        res.status(200).send({product: productStored})
      })
    })
}
