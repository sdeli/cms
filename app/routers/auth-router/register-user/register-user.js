const fs = require('fs');
const config = require('config');

const userModel = require('models/user-model');
const passwordTestRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.{8,})(?=.*[!#$%()*+,-.:;=?@[\]^_`\{|\}~]).*$/;
const uniqid = require('uniqid');
const {deleteFile} = require('widgets/server-utils');

const INCORRECT_PWD__ERR_FLASH = config.flashMsgs.validationErr.password,
    REGISTER_VIEW__EP = config.restEndpoints.auth.register.registerView,
    USER_REGISTERED__SUCC_FLASH = config.flashMsgs.auth.register.succ,
    SUCC_REDIRECT__EP = config.restEndpoints.auth.loginView;

module.exports = registerUser;

function registerUser(req, res, next){
    let validationErrs = validateRegisterFormData(req);

    let signUpDataCorrect = validationErrs.length === 0;
    if (!signUpDataCorrect) {
        deleteUploadedAvatarImg(req);
        failureRedirect(req, res, validationErrs);
        return;
    }

    insertUserSignupData(req)
    .then(() => {
        successRedirect(res);
    })
    .catch(e => {
        next(e);
    });
}

function validateRegisterFormData(req) {
    req.checkBody('name')
    .notEmpty().withMessage('please enter a name')
    .len(4, 15).withMessage('The Name should be between 4 and 15 characters')
    .trim().escape();

    req.checkBody('email')
    .notEmpty().withMessage('please enter an email')
    .len(5,100).withMessage('The length of your email should be between 5 and 100')
    .isEmail().withMessage('The email you entered is invalid, please try it again')

    req.checkBody('password')
    .matches(passwordTestRegex).withMessage(INCORRECT_PWD__ERR_FLASH)
    .escape();

    req.checkBody('passwordConf')
    .notEmpty().withMessage('please enter the confirmation of your')
    .equals(req.body.passwordConf).withMessage('The Password confirmation doesnt match your password')
    .escape();

    validationErrs = req.validationErrors({
        onlyFirstError: true
    });

    var validationErrs = Object.values(validationErrs);
    return validationErrs;
}

function deleteUploadedAvatarImg(req, next) {
    let hasUploadedAvatarImg = Boolean(req.file);
    if (!hasUploadedAvatarImg) return;

    let avatarImgFilePath = `./${req.file.path}`;
    let doesAvatarImgExist = fs.existsSync(avatarImgFilePath);
    if(!doesAvatarImgExist) return;

    deleteFile(avatarImgFilePath)
    .catch(e => {
        next(e);
    });
}

function insertUserSignupData(req) {
    req.body.userId = uniqid()

    let hasUploadedAvatarImg = Boolean(req.file);
    if (hasUploadedAvatarImg) {
        req.body.avatarImgFileName = req.file.filename;
    } else {
        req.body.avatarImgFileName = null;
    }

    return userModel.insertUserSignupData(req.body)
}

function successRedirect(res) {
    res.flash.toNext(res.flash.SUCCESS, USER_REGISTERED__SUCC_FLASH);
    res.redirect(SUCC_REDIRECT__EP);
}

function failureRedirect(req, res, validationErrs) {
    validationErrs.forEach(validationErr => {
        res.flash.toNext(res.flash.WARNING, validationErr.msg);
    });

    req.session.body = req.body;
    res.redirect(REGISTER_VIEW__EP);
}