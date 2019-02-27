const config = require('config');
let getArticleData = require('./moduls/get-article-data/get-article-data.js');
let makeOwnCategsCheckedArr = require('./moduls/make-own-categs-checked/make-own-categs-checked.js');
let getArticlesDataByCategory = require('./moduls/get-articles-data-by-category/get-articles-data-by-category.js');
let getBlogNavLinks = require('./moduls/get-blog-nav-links/get-blog-nav-links.js');

getArticleData = getArticleData({
    ARTICLE_NOT_FOUND__ERR_MSG  : config.errorMsgs.general.articleNotFound,
    ARTICLE_CATEGORY_CHECKBOX_GROUP__NAME : config.general.articleCategoryCheckboxGroupName,
    TEASERS__PATH : config.absolutePathes.teasersPath,
    ARTICLES__PATH : config.absolutePathes.articlesPath
});

getArticlesDataByCategory = getArticlesDataByCategory({
    TEASERS_FOLDERS___PATH : config.relativePathes.teasersPath,
});

getBlogNavLinks = getBlogNavLinks({
    blogNavStaticEndPoints : config.blogNavStaticEndPoints,
});

function getFormattedDate(createdAt = null) {
    if (createdAt) {
        var date = new Date(createdAt);
    } else {
        var date = new Date();
    }

    var month = date.getMonth() + 1;
    var day = date.getDate();
    var hour = date.getHours();
    var min = date.getMinutes();
    var sec = date.getSeconds();

    month = (month < 10 ? "0" : "") + month;
    day = (day < 10 ? "0" : "") + day;
    hour = (hour < 10 ? "0" : "") + hour;
    min = (min < 10 ? "0" : "") + min;
    sec = (sec < 10 ? "0" : "") + sec;

    var str = date.getFullYear() + "-" + month + "-" + day + " " +  hour + ":" + min + ":" + sec;

    return str;
}

module.exports = {
    getArticleData,
    makeOwnCategsCheckedArr,
    getArticlesDataByCategory,
    getBlogNavLinks,
    getFormattedDate
}