const config = require('config');
const articleCategsModel = require('models/article-categs-model');
const authorize = require('widgets/authorize');

const ARTICLE_CATEGORY_LIST_VIEW__PATH = config.viewPathes.admin.articleCategory.list, 
    ARTICLE_CATEGORY_LIST_VIEW__TITLE = config.templateConf.admin.articleCategory.list.title, 
    ARTICLE_CATEGORY_LIST_VIEW__ID = config.templateConf.admin.articleCategory.list.id, 
    ARTICLE_CATEGORY_CREATE_VIEW__EP = config.restEndpoints.admin.articleCategory.createView;

module.exports = getArticleCategoriesListView;

function getArticleCategoriesListView(req, res, next) {
    articleCategsModel.getAllArticleCategories()
    .then((results) => {
        let articleCategories = results;
        attachCategNameInUrl(articleCategories);
        renderArticleCategoriesListView(req, res, articleCategories);
    })
    .catch(e => {
        next(e);
    });
}

function attachCategNameInUrl(articleCategories) {
    articleCategories.forEach(articleCateg => {
        articleCateg.articleCategoryNameInUrl = encodeURIComponent(articleCateg.articleCategoryName);
    });
}

function renderArticleCategoriesListView(req, res, articleCategories) {
    res.locals.securedNavLinks = authorize.getSecuredAdminNavLinks(req.user.privilage);
    res.locals.articleCategories = articleCategories;
    res.locals.pageTitle = ARTICLE_CATEGORY_LIST_VIEW__TITLE,
    res.locals.pageId = ARTICLE_CATEGORY_LIST_VIEW__ID,
    res.locals.createArticleCategorieEp = ARTICLE_CATEGORY_CREATE_VIEW__EP,

    res.render(ARTICLE_CATEGORY_LIST_VIEW__PATH);
}