var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var productSchema = new Schema({
    codPro: Number,
    title: String,
    description: String,
    images: Number,
    categories:Number,
    userId: String,
    creationDate: Date,
    expirationDate: Date,
    status: Number
});

module.exports = mongoose.model('products', productSchema);
