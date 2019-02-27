const fs = require('fs');
const config = require('config');
const uniqid = require('uniqid');
const generator = require('generate-password');
const userModel = require('models/user-model');
const mailer = require('widgets/mailer');

const {getFormattedDate} = require('widgets/router-utils');
const {deleteFile} = require('widgets/server-utils');

const USER_EXISTS__ERR_FLASH = config.flashMsgs.validationErr.userAlreadyExists,
    REGISTER_VIEW__EP = config.restEndpoints.admin.auth.register.registerView,
    USER_REGISTERED__SUCC_FLASH = config.flashMsgs.auth.register.succ,
    SUCC_REDIRECT__EP = config.restEndpoints.admin.index,
    USER_PRIVILAGE_FRONT_END__NAME = config.users.privilages.user.frontEnd,
    USER_PRIVILAGE_BACK_END__NAME = config.users.privilages.user.backEnd,
    AUTO_GENERATED_PASSWD__LENGTH = config.routesConfig.autoGenPswLength,
    TMP_PWD_EXPIRY__MIL_SECS = config.routesConfig.tmpPwdExpiryMilSecs,
    USER_TERM_ON_FRONT_END = config.users.privilages.user.frontEnd;

module.exports = registerUser;

async function registerUser(req, res, next){
    try {
        var validationErrs = await validateRegisterFormData(req);
    } catch (err) {
        next(err)
    }

    let signUpDataCorrect = validationErrs.length === 0;
    if (!signUpDataCorrect) {
        deleteUploadedAvatarImg(req);
        failureRedirect(req, res, validationErrs);
        return;
    }

    insertUserSignupData(req)
    .then(async () => {
        let {tmpPwd, email, tmpPwdExpiry} = req.body;
        await mailer.sendCredetnialsMail(email, tmpPwd, tmpPwdExpiry);
        successRedirect(res);
    })
    .catch(e => {
        next(e);
    });
}

async function validateRegisterFormData(req) {
    var isEmailTaken = await userModel.checkIfEmailIsTaken(req.body.email);
    if (isEmailTaken) return [{msg : USER_EXISTS__ERR_FLASH}];

    req.checkBody('name')
    .notEmpty().withMessage('please enter a name')
    .len(4, 15).withMessage('The Name should be between 4 and 15 characters.')
    .trim().escape();

    req.checkBody('email')
    .notEmpty().withMessage('please enter an email.')
    .len(5,100).withMessage('The length of your email should be between 5 and 100.')
    .isEmail().withMessage('The email you entered is invalid, please try it again.');
    
    req.checkBody('privilage')
    .notEmpty().withMessage('Please specify the privilage for the new user.')
    .isIn([ADMIN_PRIVILAGE_FRONT_END__NAME, USER_PRIVILAGE_FRONT_END__NAME])
    .withMessage('Please specify a correct privilage.')
    
    req.checkBody('privilage')
    .equals(USER_TERM_ON_FRONT_END);
    
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

function failureRedirect(req, res, validationErrs) {
    validationErrs.forEach(validationErr => {
        res.flash.toNext(res.flash.WARNING, validationErr.msg);
    });

    req.session.body = req.body;
    res.redirect(REGISTER_VIEW__EP);
}

function insertUserSignupData(req) {
    req.body.privilage = USER_PRIVILAGE_BACK_END__NAME;
    req.body.tmpPwd  = generator.generate({
        length: AUTO_GENERATED_PASSWD__LENGTH,
        numbers: true
    });

    req.body.tmpPwdExpiry = new Date(Date.now() + TMP_PWD_EXPIRY__MIL_SECS);
    req.body.userId = uniqid();
    req.body.userCreatedAt = getFormattedDate();
    
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
