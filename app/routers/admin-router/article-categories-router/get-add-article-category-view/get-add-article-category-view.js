const config = require('config');
const authorize = require('widgets/authorize');

const CREATE_ARTICLE_CATEGORY_VIEW__PATH = config.viewPathes.admin.articleCategory.createEdit, 
    CREATE_ARTICLE_CATEGORY_VIEW__TITLE = config.templateConf.admin.articleCategory.create.title, 
    CREATE_ARTICLE_VIEW__ID = config.templateConf.admin.articleCategory.create.id, 
    CREATE_ARTICLE_CATEGORY__EP = config.restEndpoints.admin.articleCategory.create

module.exports = getAddArticleCategoryView;
    
function getAddArticleCategoryView(req, res) {
    let isRequestFormPrevValidationErr = Boolean(Object.keys(req.body).length)

    res.locals.securedNavLinks = authorize.getSecuredAdminNavLinks(req.user.privilage);
    res.locals.pageTitle = CREATE_ARTICLE_CATEGORY_VIEW__TITLE;
    res.locals.pageId = CREATE_ARTICLE_VIEW__ID;
    res.locals.postDataToRoute = CREATE_ARTICLE_CATEGORY__EP;
    res.locals.method = 'POST';
    res.locals.articleCategoryName = isRequestFormPrevValidationErr ? req.body.articleCategory : '';
    res.locals.userName = req.user.name;
    
    res.render(CREATE_ARTICLE_CATEGORY_VIEW__PATH);
}