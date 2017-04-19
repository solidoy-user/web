"use strict"

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

// Define the user model
const UserSchema = new Schema({
    email: {type: String, unique: true, lowercase: true, required: true},
    password: {type: String, required: true},
    firstName: String,
    lastName: String,
    address: String,
    signupDate: {type: Date, default: Date.now()},
    lastLogin: Date
});

const User = module.exports = mongoose.model('User', UserSchema);

// Generate the avatar for the user
module.exports.gravatar = function () {
    if (!this.email) return "https://es.gravatar.com/avatar/?s=200&d=retro";

    const md5 = crypto.createHash('md5').update(this.email).digest('hdex');
    return "https://es.gravatar.com/avatar/" + md5 + "?s=200&d=retro"
}

// Get user by Id
module.exports.getUserById = function (id, callback) {
    User.findById(id, callback);
}

// Get user by email
module.exports.getUserByEmail = function (email, callback) {
    const query = {email: email};
    User.findOne(query, callback);
}

// Add a user
module.exports.addUser = function (newUser, callback) {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser.save(callback);
        });
    })
}

// Compare password
module.exports.comparePassword = function(candidatePassword, hash, callback){
    bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
        if(err) throw err;
        callback(null, isMatch);
    });
}