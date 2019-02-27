const express = require('express');
const config = require('config');
const passport = require('passport');
const authRouter = express.Router();
let {moveSessionBodyToReq, requireBeAuthenticated, requireBeTmpAuthenticated, redirectIfLoggedIn} = require('widgets/middlewares');

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
let getChangeTmpView = require('./get-change-tmp-pwd-view/get-change-tmp-pwd-view.js');
let changeTmpPwd = require('./change-tmp-pwd/change-tmp-pwd.js');

const FAILED_LOGIN__ERR_FLASH = config.flashMsgs.localLogin.err;
const FAILED_TMP_LOGIN__ERR_FLASH = config.flashMsgs.tmpLocalLogin.err;
const SUCC_TMP_LOGIN__FLASH = config.flashMsgs.tmpLocalLogin.succ;
const GET_LOGIN_VIEW__EP = config.restEndpoints.admin.auth.logInView.replace(/(.*)(\/:\w+\?)/, '$1');
const GET_TMP_LOGIN_VIEW = `${GET_LOGIN_VIEW__EP}/tmp`;
const MONTH__MIL_SECS = 3600000 * 24 * 30;

requireBeAuthenticated = requireBeAuthenticated('');

authRouter.get(config.restEndpoints.admin.auth.logInView, redirectIfLoggedIn, moveSessionBodyToReq, getLoginView);
authRouter.get(config.restEndpoints.admin.auth.register.registerView, requireBeAuthenticated, moveSessionBodyToReq, getRegisterView);
authRouter.post(config.restEndpoints.admin.auth.register.createUser, requireBeAuthenticated, upload.single('userAvatarImg'), registerUser);
authRouter.post(config.restEndpoints.admin.auth.changeTmpPwd, requireBeTmpAuthenticated, changeTmpPwd);
authRouter.get(config.restEndpoints.admin.auth.changeTmpPwdView, requireBeTmpAuthenticated, getChangeTmpView);

authRouter.get(config.restEndpoints.admin.auth.logOut, requireBeAuthenticated, (req, res, next) => {
    req.logout();
    
    req.session.regenerate((err) => {
        if (err) return next(err);
        res.redirect(GET_LOGIN_VIEW__EP);
    });
});

authRouter.post(config.restEndpoints.admin.auth.oAuth.local.login, redirectIfLoggedIn, passport.authenticate('local' , { 
        successRedirect: config.restEndpoints.admin.auth.oAuth.succRed,
        failureRedirect: config.restEndpoints.admin.auth.oAuth.failureRed,
        failureUser: true
    })
);

authRouter.get(config.restEndpoints.admin.auth.oAuth.failureRed, redirectIfLoggedIn, (req, res) => {
    res.flash.toNext(res.flash.WARNING, FAILED_LOGIN__ERR_FLASH);
    req.session.body = req.session.failedUser;
    delete req.session.failedUser;
    res.redirect(GET_TMP_LOGIN_VIEW)
});

authRouter.get(config.restEndpoints.admin.auth.oAuth.succRed, requireBeAuthenticated, (req, res) => {
    let shouldRememberLogin = Boolean(req.user.rememberLoginBox);
    if (shouldRememberLogin) {
        req.session.cookie.expires = new Date(Date.now() + MONTH__MIL_SECS)
    }

    let wasRedirectedToLogin = Boolean(req.session.requestedUrl);
    if (wasRedirectedToLogin) {
        let requestedUrl = req.session.requestedUrl;
        delete req.session.requestedUrl;
        res.redirect(requestedUrl);
    } else {
        res.redirect(config.restEndpoints.admin.index);
    }
});

authRouter.post(config.restEndpoints.admin.auth.tmpOAuth.local.login, redirectIfLoggedIn, passport.authenticate('local' , { 
        failureRedirect: config.restEndpoints.admin.auth.tmpOAuth.failureRed,
        successRedirect: config.restEndpoints.admin.auth.tmpOAuth.succRed,
        failureUser: true
    })
);

authRouter.get(config.restEndpoints.admin.auth.tmpOAuth.failureRed, redirectIfLoggedIn, (req, res) => {
    res.flash.toNext(res.flash.WARNING, FAILED_TMP_LOGIN__ERR_FLASH);
    req.session.body = req.session.failedUser;
    delete req.session.failedUser;
    res.redirect(GET_TMP_LOGIN_VIEW)
});

authRouter.get(config.restEndpoints.admin.auth.tmpOAuth.succRed, requireBeTmpAuthenticated, (req, res) => {
    res.flash.toNext(res.flash.SUCCESS, SUCC_TMP_LOGIN__FLASH);

    res.redirect(config.restEndpoints.admin.auth.changeTmpPwdView);
});

module.exports = authRouter;