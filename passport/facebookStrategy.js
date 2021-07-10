const FacebookStrategy = require('passport-facebook').Strategy;
const mongoose = require("mongoose");
const User = mongoose.model("users");
const keys = require("../config/keys");

const strategy = new FacebookStrategy({
        clientID: keys.FACEBOOK_CLIENT_ID,
        clientSecret: keys.FACEBOOK_CLIENT_SECRET,
        callbackURL: keys.FACEBOOK_CALLBACK_URL
    },
    function (accessToken, refreshToken, profile, done) {
        User.findOne({
            'facebook.id': profile.id
        }, function (err, user) {
            if (err) {
                return done(err);
            }
            if (!user) {
                user = new User({
                    name: profile.displayName,
                    email: profile.email,
                    username: profile.username || profile.displayName.split(" ").join("."),
                    provider: 'facebook',
                    facebook: profile._json
                });
                user.save(function (err) {
                    if (err) return done(err);
                    return done(null, user);
                });
            } else {
                return done(null, user);
            }
        });
    }
);

module.exports = strategy