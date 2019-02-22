const config = require('config');

const REGISTER_VIEW__PATH = config.viewPathes.admin.auth.register,
    REGISTER_VIEW__TITLE = config.templateConf.admin.auth.register.title,
    REGISTER_VIEW__ID = config.templateConf.admin.auth.register.id,
    CREATE_USER__EP = config.restEndpoints.admin.auth.register.createUser;
    ADMIN_PRIVILAGE_FRONT_END__NAME = config.users.privilages.admin.frontEnd;
    USER_PRIVILAGE_FRONT_END__NAME = config.users.privilages.user.frontEnd;
    
module.exports = getRegisterView;

function getRegisterView(req, res){
    let isReguestFromPrevValidationErr = Boolean(Object.keys(req.body).length);
    if (isReguestFromPrevValidationErr) {
        var registerUserData = req.body
    } else {
        var registerUserData = {};
    }

    registerUserData.user = USER_PRIVILAGE_FRONT_END__NAME;
    
    res.render(REGISTER_VIEW__PATH, {
        pageTitle : REGISTER_VIEW__TITLE,
        pageId : REGISTER_VIEW__ID,
        postDataToRoute : CREATE_USER__EP,
        registerUserData
    });
}