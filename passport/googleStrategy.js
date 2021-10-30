const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require("mongoose");
const User = mongoose.model("users");
const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_CALLBACK_URL } = require("../config/keys");

const strategy = new GoogleStrategy({
        clientID: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        callbackURL: GOOGLE_CALLBACK_URL
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
                }).then(r => console.log(r));
            } else {
                return done(null, user);
            }
        })
    }
)

module.exports = strategy