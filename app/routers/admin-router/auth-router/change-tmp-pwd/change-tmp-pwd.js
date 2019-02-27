const config = require('config');
const userModel = require('models/user-model');

const GET_CHANGE_TMP_PWD_VIEW__EP = config.restEndpoints.admin.auth.changeTmpPwdView,
    PWD_UPDATED__SUCC_FLASH = config.flashMsgs.admin.users.changedTmpPwd.succ,
    PWD_TEST_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.{8,})(?=.*[!#$%()*+,-.:;=?@[\]^_`\{|\}~]).*$/,
    PWD_REGEX_TEST_FAILURE__ERR_FLASH = config.flashMsgs.validationErr.password,
    PWD_CONF_DOESNT_MATCH_PWD__ERR_FLASH = config.flashMsgs.validationErr.passwordConf,
    GET_LOGIN_VIEW__EP = config.restEndpoints.admin.auth.logInView.replace(/(.*)(\/:\w+\?)/, '$1');

module.exports = changeTmpPwd;
    
function changeTmpPwd(req, res, next) {
    let validationErrs = validateChangeTmpPwdForm(req);
    let isNewPwdValid = validationErrs.length === 0;
    
    if (!isNewPwdValid) return denyChangeTmpPwd(req, res, validationErrs);

    ActivateUserchangeTmpPassword(req)
    .then(() => {
        req.logout();
        notifAboutChangedTmpPwd(req, res);
    })
    .catch(err => {
        next(err);
    });
}

function validateChangeTmpPwdForm(req) {
    req.checkBody('password')
    .matches(PWD_TEST_REGEX).withMessage(PWD_REGEX_TEST_FAILURE__ERR_FLASH);

    req.checkBody('passwordConf')
    .equals(req.body.password).withMessage(PWD_CONF_DOESNT_MATCH_PWD__ERR_FLASH);

    validationErrs = req.validationErrors({
        onlyFirstError: true
    });

    var validationErrs = Object.values(validationErrs);
    return validationErrs;
}

function ActivateUserchangeTmpPassword(req) {
    var userId = req.user.userId;
    let newPassword = req.body.password;

    return userModel.activateUserChangeTmpPassword(userId, newPassword)
}

function denyChangeTmpPwd(req, res, validationErrs) {
    validationErrs.forEach(({msg}) => {
        res.flash.toNext(res.flash.WARNING, msg);
    });
    
    req.session.body = req.body;
    res.redirect(GET_CHANGE_TMP_PWD_VIEW__EP);
}

function notifAboutChangedTmpPwd(req, res) {
    res.flash.toNext(res.flash.SUCCESS, PWD_UPDATED__SUCC_FLASH);
    console.log(req);
    res.redirect(GET_LOGIN_VIEW__EP);
}
