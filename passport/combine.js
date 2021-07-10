const LocalStrategy = require('./localStrategy')
const FacebookStrategy = require('./facebookStrategy')
const GoogleStrategy = require('./googleStrategy')

module.exports = passport => {
    passport.use(LocalStrategy)
    passport.use(FacebookStrategy)
    passport.use(GoogleStrategy)

    passport.serializeUser(function (user, done) {
        done(null, user);
    });

    passport.deserializeUser(function (obj, done) {
        done(null, obj);
    });
};





