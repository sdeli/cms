const express = require('express');
const config = require('config');
const passport = require('passport');
const authRouter = express.Router();
const {moveSessionBodyToReq} = require('widgets/middlewares');

var multer  = require('multer');
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, config.relativePathes.public.img.user.avatar)
  },
  filename: function (req, file, cb) {
    cb(null, `${file.fieldname.toLowerCase()}-${Date.now()}`)
  }
});

var upload = multer({ storage: storage })

let getRegisterView = require('./get-register-view/get-register-view.js');
let registerUser = require('./register-user/register-user.js');
let getLoginView = require('./get-login-view/get-login-view');

authRouter.get(config.restEndpoints.auth.loginView, getLoginView);
authRouter.get(config.restEndpoints.auth.register.registerView, moveSessionBodyToReq, getRegisterView);
authRouter.post(config.restEndpoints.auth.register.createUser, upload.single('userAvatarImg'), registerUser);

authRouter.get(config.restEndpoints.auth.oAuth.google.login, passport.authenticate('google', {
    scope:[
        'https://www.googleapis.com/auth/userinfo.profile',
        'https://www.googleapis.com/auth/userinfo.email'
    ]
}));

authRouter.get(config.restEndpoints.auth.oAuth.google.loginRed, passport.authenticate('google', {
    successRedirect: config.restEndpoints.auth.oAuth.succRed,
    failureRedirect: config.restEndpoints.auth.oAuth.failureRed
}));

authRouter.post(config.restEndpoints.auth.oAuth.local.login, passport.authenticate('local' , { 
        successRedirect: config.restEndpoints.auth.oAuth.succRed,
        failureRedirect: config.restEndpoints.auth.oAuth.failureRed
    })
);

authRouter.get(config.restEndpoints.auth.oAuth.failureRed, (req, res) => {
    res.send(config.flashMsgs.googleLogin.err);
});

authRouter.get(config.restEndpoints.auth.oAuth.succRed, (req, res) => {
    res.json(req.user);
});


module.exports = authRouter;