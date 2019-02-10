const config = require('config');
let getArticleFormData = require('./moduls/get-article-form-data/get-article-form-data.js');

const CREATE_ARTICLE_VIEW__PATH = config.viewPathes.admin.article.createEdit,
    CREATE_ARTICLE_VIEW__TITLE = config.templateConf.admin.article.create.title,
    CREATE_ARTICLE_VIEW__ID = config.templateConf.admin.article.create.id,
    SEND_ARTICLE_DATA_TO__EP = config.restEndpoints.admin.article.create,
    ARTICLE_CATEGORY_CHECKBOX_GROUP__NAME = config.general.articleCategoryCheckboxGroupName;

getArticleFormData = getArticleFormData({
    ARTICLE_CATEGORY_CHECKBOX_GROUP__NAME
});
    
module.exports = getCreateArticleView;

function getCreateArticleView(req, res, next) {
    getArticleFormData(req)
    .then((articleFormData) => {
        renderCreateArticlePage(res, articleFormData);
    })
    .catch(e => {
        next(e);
    });
}

function renderCreateArticlePage(res, articleFormData) {
    res.render(CREATE_ARTICLE_VIEW__PATH, {
        pageTitle : CREATE_ARTICLE_VIEW__TITLE,
        pageId : CREATE_ARTICLE_VIEW__ID,
        postDataToRoute : SEND_ARTICLE_DATA_TO__EP,
        articleData : articleFormData
    });
}