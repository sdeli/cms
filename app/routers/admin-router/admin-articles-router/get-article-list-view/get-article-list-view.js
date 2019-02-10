const config = require('config');
const articlesModel = require('models/articles-model');

const ARTICLE_LIST_VIEW__PATH = config.viewPathes.admin.article.list,
  ARTICLE_LIST_VIEW__TITLE = config.templateConf.admin.article.list.title,
  ARTICLE_LIST_VIEW__ID = config.templateConf.admin.article.list.id,
  ADMIN_ARTICLE_CREATE_VIEW__EP = config.restEndpoints.admin.article.createView;

module.exports = getArticleListView;

function getArticleListView(req, res) {
    articlesModel.getAllArticles()
    .then(({results}) => {
        let allArticles = results;
        renderArticlesListView(res, allArticles);
    })
    .catch(e => {
        console.log(e);
    });
}

function renderArticlesListView(res, allArticles) {
    res.render(ARTICLE_LIST_VIEW__PATH, {
        pageTitle : ARTICLE_LIST_VIEW__TITLE,
        pageId : ARTICLE_LIST_VIEW__ID,
        createArticleEp : ADMIN_ARTICLE_CREATE_VIEW__EP,
        allArticles
    });
}