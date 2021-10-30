const mongoose = require("mongoose");
const User = mongoose.model("users");
const {ExtractJwt} = require("passport-jwt");
const {secretOrKey} = require("../config/keys");
const JwtStrategy = require("passport-jwt").Strategy;
const opts = {
    secretOrKey: secretOrKey,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
};

const strategy = new JwtStrategy(opts, (jwt_payload, done) => {
    User.findById(jwt_payload.id)
        .then(user => {
            return user ? done(null, user) : done(null, false)
        })
        .catch(err => console.log(err));
});

module.exports = strategy