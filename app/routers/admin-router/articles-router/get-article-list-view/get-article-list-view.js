const config = require('config');
const articlesModel = require('models/articles-model');
const authorize = require('widgets/authorize');

const ARTICLE_LIST_VIEW__PATH = config.viewPathes.admin.article.list,
  ARTICLE_LIST_VIEW__TITLE = config.templateConf.admin.article.list.title,
  ARTICLE_LIST_VIEW__ID = config.templateConf.admin.article.list.id,
  ADMIN_ARTICLE_CREATE_VIEW__EP = config.restEndpoints.admin.article.createView;

module.exports = getArticleListView;

function getArticleListView(req, res, next) {
    articlesModel.getAllArticles()
    .then((results) => {
        let allArticles = results;
        renderArticlesListView(req, res, allArticles);
    })
    .catch(e => {
        next(e)
    });
}

function renderArticlesListView(req, res, allArticles) {
    res.locals.pageTitle = ARTICLE_LIST_VIEW__TITLE,
    res.locals.pageId = ARTICLE_LIST_VIEW__ID,
    res.locals.createArticleEp = ADMIN_ARTICLE_CREATE_VIEW__EP,
    res.locals.securedNavLinks = authorize.getSecuredAdminNavLinks(req.user.privilage);
    res.locals.allArticles = allArticles
    res.locals.userName = req.user.name;
    
    res.render(ARTICLE_LIST_VIEW__PATH);
}