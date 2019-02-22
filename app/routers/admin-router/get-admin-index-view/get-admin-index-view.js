const config = require('config');
const authorize = require('widgets/authorize');

const INDEX_VIEW__PATH = config.viewPathes.admin.index, 
    INDEX_VIEW__TITLE = config.templateConf.admin.index.title, 
    INDEX_VIEW__ID = config.templateConf.admin.index.id;

module.exports = getAdminIndexView;

function getAdminIndexView(req, res){
    res.locals.securedNavLinks = authorize.getSecuredAdminNavLinks(req.user.privilage),
    res.locals.pageTitle = INDEX_VIEW__TITLE,
    res.locals.pageId = INDEX_VIEW__ID,

    res.render(INDEX_VIEW__PATH);
}