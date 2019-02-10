const config = require('config');
const articleCategsModel = require('models/article-categs-model');

const ARTICLE_CATEGORY_LIST_VIEW__PATH = config.viewPathes.admin.articleCategory.list, 
    ARTICLE_CATEGORY_LIST_VIEW__TITLE = config.templateConf.admin.articleCategory.list.title, 
    ARTICLE_CATEGORY_LIST_VIEW__ID = config.templateConf.admin.articleCategory.list.id, 
    ARTICLE_CATEGORY_CREATE_VIEW__EP = config.restEndpoints.admin.articleCategory.createView;

module.exports = getArticleCategoriesListView;

function getArticleCategoriesListView(req, res, next) {
    articleCategsModel.getAllArticleCategories()
    .then((results) => {
        let articleCategories = results;
        renderArticleCategoriesListView(res, articleCategories);
    })
    .catch(e => {
        next(e);
    });
}

function renderArticleCategoriesListView(res, articleCategories) {
    res.render(ARTICLE_CATEGORY_LIST_VIEW__PATH, {
        pageTitle : ARTICLE_CATEGORY_LIST_VIEW__TITLE,
        pageId : ARTICLE_CATEGORY_LIST_VIEW__ID,
        createArticleCategorieEp : ARTICLE_CATEGORY_CREATE_VIEW__EP,
        articleCategories
    });
}