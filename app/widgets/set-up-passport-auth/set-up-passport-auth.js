const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const LocalStrategy = require('passport-local').Strategy;

const config = require('config');
const handleLocalLogin = require('./moduls/handle-local-login/handle-local-login.js');

const GOOGLE_CLIENT_ID = process.env.GOOGLE_OAUTH__CLIENT_ID,
    GOOGLE_CLIENT_SECRET = process.env.GOOGLE_OAUTH__CLIENT_SECRET,
    GOOGLE_CALLBACK_URL = 'http://' + config.general.hostName + config.restEndpoints.auth.oAuth.google.loginRed;

module.exports = setUpPassportAuth;
    
function setUpPassportAuth(app) {
    app.use(passport.initialize());
    app.use(passport.session());

    passport.use(new GoogleStrategy({
        clientID: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        callbackURL: GOOGLE_CALLBACK_URL
        }, (accessToken, refreshToken, profile, cb) => {
            console.log(accessToken, ' ', refreshToken, ' ',profile, ' ',cb);
            return cb(null, profile);
        })
    );

    passport.use(new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password'
    }, handleLocalLogin));

    passport.serializeUser((user, done) => {
        done(null, user);
    });

    passport.deserializeUser((user, done) => {
        done(null, user);
    });
}