const adminModel = require('admin-model').getInst();
const env = process.env;

module.exports = ((config) => {
    const {ARTICLE_LIST__VIEW, ARTICLE_LIST_VIEW__TITLE, ARTICLE_LIST_VIEW__ID, ADMIN_ARTICLE_CREATE_VIEW__EP} = config;

    return getArticleListView;

    function getArticleListView(req, res) {
        adminModel.getAllArticles()
        .then(({results}) => {
            let allArticles = results;
            renderArticlesListView(res, allArticles);
        })
        .catch(e => {
            console.log(e);
        });
    }
    
    function renderArticlesListView(res, allArticles) {
        res.render(ARTICLE_LIST__VIEW, {
            pageTitle : ARTICLE_LIST_VIEW__TITLE,
            pageId : ARTICLE_LIST_VIEW__ID,
            createArticleEp : ADMIN_ARTICLE_CREATE_VIEW__EP,
            allArticles
        });
    }
});