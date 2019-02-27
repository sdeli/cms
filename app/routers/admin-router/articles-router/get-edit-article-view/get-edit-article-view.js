const config = require('config');
const authorize = require('widgets/authorize');

let getArticleData = require('./moduls/get-article-data/get-article-data.js');

const EDIT_ARTICLE_VIEW__PATH = config.viewPathes.admin.article.createEdit,
    EDIT_ARTICLE_VIEW__TITLE = config.templateConf.admin.article.edit.title,
    EDIT_ARTICLE_VIEW__ID = config.templateConf.admin.article.edit.id,
    UPDATE_ARTICLE__EP = config.restEndpoints.admin.article.update,
    ARTICLE_CATEGORY_CHECKBOX_GROUP__NAME = config.general.articleCategoryCheckboxGroupName;

getArticleData = getArticleData({
    ARTICLE_CATEGORY_CHECKBOX_GROUP__NAME
})

module.exports = getEditArticleView;

function getEditArticleView(req, res, next) {
    getArticleData(req)
    .then(articleData => {
        renderEditArticleView(req, res, articleData);
    })
    .catch(e => {
        next(e);
    });
}

function renderEditArticleView(req, res, articleData) {
    res.locals.pageTitle = `${EDIT_ARTICLE_VIEW__TITLE} ${articleData.articleName}`;
    res.locals.pageId = EDIT_ARTICLE_VIEW__ID;
    res.locals.postDataToRoute = UPDATE_ARTICLE__EP;
    res.locals.articleData = articleData;
    res.locals.securedNavLinks = authorize.getSecuredAdminNavLinks(req.user.privilage);
    res.locals.userName = req.user.name;
    
    res.render(EDIT_ARTICLE_VIEW__PATH);
}