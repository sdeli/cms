const config = require('config');

const REGISTER_VIEW__PATH = config.viewPathes.register,
    REGISTER_VIEW__TITLE = config.templateConf.auth.register.title,
    REGISTER_VIEW__ID = config.templateConf.auth.register.id,
    CREATE_USER__EP = config.restEndpoints.auth.register.createUser;

module.exports = getRegisterView;

function getRegisterView(req, res){
    let isReguestFromPrevValidationErr = Boolean(Object.keys(req.body).length);
    if (isReguestFromPrevValidationErr) {
        var registerUserData = req.body
    } else {
        var registerUserData = {};
    }

    res.render(REGISTER_VIEW__PATH, {
        pageTitle : REGISTER_VIEW__TITLE,
        pageId : REGISTER_VIEW__ID,
        postDataToRoute : CREATE_USER__EP,
        registerUserData
    });
}