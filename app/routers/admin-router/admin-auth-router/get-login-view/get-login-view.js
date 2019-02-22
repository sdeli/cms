const config = require('config');

const LOGIN_VIEW__PATH = config.viewPathes.admin.auth.login,
    LOGIN_VIEW__TITLE = config.templateConf.admin.auth.login.title,
    LOGIN_VIEW__ID = config.templateConf.admin.auth.login.id,
    LOGIN__EP = config.restEndpoints.admin.auth.oAuth.local.login;
    TMP_PWD_LOGIN__EP = config.restEndpoints.admin.auth.tmpOAuth.local.login;

module.exports = getLoginView;
    
function getLoginView(req, res) {
    let isRequestFromPrevValidationErr = Boolean(Object.keys(req.body).length);
    if (isRequestFromPrevValidationErr) {
        var loginData = req.body;
    } else {
        var loginData = {};
    }

    let isTmpPwdLogin = Boolean(req.params.isTmpLogin);
    if (isTmpPwdLogin) {
        loginData.isTmpPwdLogin = true;
        var postUserDataTo = TMP_PWD_LOGIN__EP;
    } else {
        loginData.isTmpPwdLogin = false;
        var postUserDataTo = LOGIN__EP;
    }

    renderLoginView(res, postUserDataTo, loginData);
}

function renderLoginView(res, postUserDataTo, loginData) {
    res.render(LOGIN_VIEW__PATH, {
        pageTitle : LOGIN_VIEW__TITLE,
        pageId : LOGIN_VIEW__ID,
        postUserDataTo,
        loginData
    });
}