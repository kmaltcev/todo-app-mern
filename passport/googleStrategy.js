const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require("mongoose");
const User = mongoose.model("users");
const keys = require("../config/keys");

const strategy = new GoogleStrategy({
        clientID: keys.GOOGLE_CLIENT_ID,
        clientSecret: keys.GOOGLE_CLIENT_SECRET,
        callbackURL: keys.GOOGLE_CALLBACK_URL
    },
    function(request, accessToken, refreshToken, profile, done) {
        User.findOne({
            'google.sub': profile.id
        }, function (err, user) {
            if (err) {
                return done(err);
            }
            if (!user) {
                user = new User({
                    name: profile.displayName,
                    email: profile.email,
                    username: profile.username || profile.displayName.split(" ").join("."),
                    provider: 'google',
                    google: profile._json
                });
                user.save(function (err) {
                    if (err) return done(err);
                    return done(null, user);
                });
            } else {
                return done(null, user);
            }
        })
    }
)

module.exports = strategy