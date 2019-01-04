const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const LocalStrategy = require('passport-local').Strategy;
var conn = require('db-pool');

function setUpPassportAuth(app) {
    app.use(passport.initialize());
    app.use(passport.session());

    passport.use(new GoogleStrategy({
        clientID: '363672687220-mq5vsi9rprjvhkgajffhrfmihun56ed6.apps.googleusercontent.com',
        clientSecret: 'YRfvOAOgHYM7UZpF4kLRUjaE',
        callbackURL: "http://localhost:3500/auth/google-login/redirect"
        }, (accessToken, refreshToken, profile, cb) => {
            console.log(accessToken, ' ', refreshToken, ' ',profile, ' ',cb);
            return cb(null, profile);
        })
    );

    passport.use(new LocalStrategy({
            usernameField: 'email',
            passwordField: 'passwd'
        },(email, password, done) => {
            email = conn.escape(email);
            password = conn.escape(password);

            let sql = `SELECT user_id, name, email, password_hash FROM users where users.email = ${email};`;

            // conn.query(sql, (error, results, fields) => {
            //     if (error) { return done(error); }
            //     if (results.length === 0) { return done(null, false); }
            //     return done(null, results);
            // });

            conn.query(sql)
            .then(res => {
                if (res.results.length === 0) return done(null, false);
                return done(null, res.results);
            })
            .catch(err => done(error))
        }
    ));

    passport.serializeUser((user, done) => {
        done(null, user);
    });

    passport.deserializeUser((user, done) => {
        done(null, user);
    });
}

module.exports = setUpPassportAuth;