const config = require('config');

const LOGIN_VIEW__PATH = config.viewPathes.login,
    LOGIN_VIEW__TITLE = config.templateConf.auth.login.title,
    LOGIN_VIEW__ID = config.templateConf.auth.login.id,
    LOGIN_USER__EP = config.restEndpoints.auth.oAuth.local.login;

module.exports = getLoginView;
    
function getLoginView(req, res) {
    res.render(LOGIN_VIEW__PATH, {
        pageTitle : LOGIN_VIEW__TITLE,
        pageId : LOGIN_VIEW__ID,
        postUserDataTo : LOGIN_USER__EP
    });
}