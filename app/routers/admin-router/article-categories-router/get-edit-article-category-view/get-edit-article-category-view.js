const config = require('config');
const articleCategsModel = require('models/article-categs-model');
const authorize = require('widgets/authorize');

const  ARTICLE_CATEGORY_NOT_FOUND_IN_DB__ERR_MSG = config.errorMsgs.general.articleCategoryNotFoundInDb, 
    UNEXPECTED_ERR_EVENT__ERR_FLASH = config.errorMsgs.general.fallbackErr,
    EDIT_ARTICLE_CATEGORY_VIEW__PATH = config.viewPathes.admin.articleCategory.createEdit,
    EDIT_ARTICLE_CATEGORY_VIEW__TITLE = config.templateConf.admin.articleCategory.edit.title, 
    EDIT_ARTICLE_CATEGORY_VIEW__ID = config.templateConf.admin.articleCategory.edit.id, 
    UPDATE_ARTICLE_CATEGORY__EP = config.restEndpoints.admin.articleCategory.update,
    FAILURE_REDIRECT__EP = config.restEndpoints.admin.articleCategory.listView;

module.exports = getEditArticleCategoryView;

function getEditArticleCategoryView(req, res, next) {
    let {articleCategoryName} = req.params;
        articleCategoryName = decodeURIComponent(articleCategoryName);

    articleCategsModel.checkIfArticleCategExists(articleCategoryName)
    .then((doesArticleCategExists) => {
        if (doesArticleCategExists) {
            renderEditArticleView(req, res, articleCategoryName)
        } else {
            denyEditArticle(res)
        }
    })
    .catch(e => {
        next(e);
    });
}

function renderEditArticleView(req, res, articleCategoryName) {
    res.locals.pageTitle = `${EDIT_ARTICLE_CATEGORY_VIEW__TITLE} ${articleCategoryName}`;
    res.locals.pageId = EDIT_ARTICLE_CATEGORY_VIEW__ID;
    res.locals.postDataToRoute = UPDATE_ARTICLE_CATEGORY__EP;
    res.locals.articleCategoryName = articleCategoryName;
    res.locals.securedNavLinks = authorize.getSecuredAdminNavLinks(req.user.privilage);
    res.locals.method = "PUT";
    res.locals.userName = req.user.name;
    
    res.render(EDIT_ARTICLE_CATEGORY_VIEW__PATH);
}

function denyEditArticle(res) {
    res.flash.toNext(res.flash.WARNING, UNEXPECTED_ERR_EVENT__ERR_FLASH);
    res.redirect(FAILURE_REDIRECT__EP);
}