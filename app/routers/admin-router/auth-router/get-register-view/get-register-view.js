const config = require('config');
const authorize = require('widgets/authorize');

const REGISTER_VIEW__PATH = config.viewPathes.admin.auth.register,
    REGISTER_VIEW__TITLE = config.templateConf.admin.auth.register.title,
    REGISTER_VIEW__ID = config.templateConf.admin.auth.register.id,
    CREATE_USER__EP = config.restEndpoints.admin.auth.register.createUser;
    ADMIN_PRIVILAGE_FRONT_END__NAME = config.users.privilages.admin.frontEnd;
    USER_PRIVILAGE_FRONT_END__NAME = config.users.privilages.user.frontEnd;
    
module.exports = getRegisterView;

function getRegisterView(req, res, next){
    let isReguestFromPrevValidationErr = Boolean(Object.keys(req.body).length);
    if (isReguestFromPrevValidationErr) {
        res.locals.registerUserData = req.body
    } else {
        res.locals.registerUserData = {};
    }

    res.locals.registerUserData.userTerm = USER_PRIVILAGE_FRONT_END__NAME;
    res.locals.securedNavLinks = authorize.getSecuredAdminNavLinks(req.user.privilage);
    res.locals.pageTitle = REGISTER_VIEW__TITLE,
    res.locals.pageId = REGISTER_VIEW__ID,
    res.locals.postDataToRoute = CREATE_USER__EP,
    res.locals.userName = req.user.name;
    
    try {
        res.render(REGISTER_VIEW__PATH);
    } catch (err) {
        next(err);
    }
}