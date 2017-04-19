const Jwtstrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt,
    User = require('../models/user'),
    config = require('../config');

module.exports = function (passport) {
    let opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeader();
    opts.secretOrKey = config.SECRET_TOKEN;

    passport.use(new Jwtstrategy(opts,(jwt_payload,done) => {
        User.getUserById(jwt_payload._doc._id, (err,user) =>{
            if(err) return done(err, false);

            if(user) return done(null,user);
            else return done(null,false);
        });
    }));
}