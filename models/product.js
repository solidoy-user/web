'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProductSchema = Schema({
    codPro: Number,
    title: String,
    description: String,
    images: { type: String },
    category:{ type: String, enum: [
      'Motor y accesorios', 'Electrónica', 'Deporte y ocio'
    ]}
    // creationDate: Date,
    // expirationDate: Date,
    // status: Number
})

module.exports = mongoose.model('Product', ProductSchema)
