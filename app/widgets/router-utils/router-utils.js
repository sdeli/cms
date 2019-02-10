const config = require('config');
let getArticleData = require('./moduls/get-article-data/get-article-data.js');
let makeOwnCategsCheckedArr = require('./moduls/make-own-categs-checked/make-own-categs-checked.js');

getArticleData = getArticleData({
    ARTICLE_NOT_FOUND__ERR_MSG  : config.errorMsgs.general.articleNotFound,
    ARTICLE_CATEGORY_CHECKBOX_GROUP__NAME : config.general.articleCategoryCheckboxGroupName,
    TEASERS__PATH : config.absolutePathes.teasersPath,
    ARTICLES__PATH : config.absolutePathes.articlesPath
})

module.exports = {
    getArticleData,
    makeOwnCategsCheckedArr
}