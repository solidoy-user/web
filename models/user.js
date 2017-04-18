"use strict"

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');
const crypto = require('crypto');

// Define the user model
const UserSchema = new Schema({
    email: { type: String, unique: true, lowercase: true},
    password: { type: String, select: false},
    name: String,
    lastName: String,
    address: String,
    signupDate: { type: Date, default: Date.now()},
    lastLogin: Date
});

// Now before saving the user into the database first encrypt the password
UserSchema.pre('save',function (next) {
    let user  = this;
    // If user didn't change the password then go to the next middleware
    if(!user.isModified('password')) return next();

    // Else
    bcrypt.genSalt(10, function (err,salt) {
        // If there's an error go to the next middleware
        if(err) return next(err);

        // else
        bcrypt.hash(user.password,salt,null,function (err,hash) {
            if(err) return next(err);

            // If there's no error, then change the password entered by the user to the generated hash
            user.password = hash;
            next();
        })
    })
})

// Now export the model
module.exports = mongoose.model('User',UserSchema)
// Generate the avatar for the user
module.exports.gravatar = function () {
    if(!this.email) return "https://es.gravatar.com/avatar/?s=200&d=retro"

    const md5 = crypto.createHash('md5').update(this.email).digest('hdex')
    return "https://es.gravatar.com/avatar/" + md5 + "?s=200&d=retro"
}

module.exports.comparePassword = function (userPasswword,hash,callback) {
    bcrypt.compare(userPasswword, hash, function (err, isMatch) {
        if (err) throw err;
        callback(null, isMatch);
    });
}