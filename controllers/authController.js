'use strict'

const User = require('../models/user');
const jwt = require('jsonwebtoken');
const config = require('../config');
const moment = require('moment');

/**
 * SignUp method to register a user into the database
 */
function signUp(req,res) {
    let user = new User({
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: req.body.password,
        address: req.body.address
    });

    User.addUser(user,(err,newUser) => {
        if(err)
            res.render('signUp',{success: false,message:`Failed to register user`});
        else
            res.render('signUp',{success:true,message:'User registered, now you can login'});
    });
}

/**
 * SignIn method to login users after registration
 */
function signIn(req,res) {
    const email = req.body.email;
    const password = req.body.password;

    User.getUserByEmail(email, (err,user)=>{
       if(err) throw err;

       if(!user) return res.render('login',{success:false,message:"User not found"});

       User.comparePassword(password,user.password,(err,isMatch)=> {
            if(err) throw err;
            if(isMatch) {
                const token = jwt.sign(user,config.SECRET_TOKEN,{
                    expiresIn: moment().add('1','week').unix()
                });
                res.render('login',{
                    success: true,
                    token: 'JWT '+token,
                    user: {
                        id: user._id,
                        firstName:user.firstName,
                        lastName:user.lastName,
                        email:user.email
                    }
                });
            } else {
                return res.render('login',{success:false,message:"Wrong password"});
            }
       });
    });

}

// Exports the functions
module.exports = {
    signUp,
    signIn
}