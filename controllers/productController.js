'use strict'

const mongoose = require('mongoose');
const User = require('../models/product');
const service = require('../services');

function insertProduct(req,res){
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
}
