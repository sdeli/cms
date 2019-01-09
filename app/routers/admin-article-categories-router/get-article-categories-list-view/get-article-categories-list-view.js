const articleCategsModel = require('article-categs-model').getInst();

module.exports = ((config) => {
    const {
        ARTICLE_CATEGORY_LIST_VIEW__PATH, 
        ARTICLE_CATEGORY_LIST_VIEW__TITLE, 
        ARTICLE_CATEGORY_LIST_VIEW__ID, 
        ARTICLE_CATEGORY_CREATE_VIEW__EP,
    } = config;

    return getArticleCategoriesListView;

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
});