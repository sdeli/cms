const config = require('config');
let getArticleData = require('./moduls/get-article-data/get-article-data.js');
let makeOwnCategsCheckedArr = require('./moduls/make-own-categs-checked/make-own-categs-checked.js');
let getArticlesDataByCategory = require('./moduls/get-articles-data-by-category/get-articles-data-by-category.js');
let getBlogNavLinks = require('./moduls/get-blog-nav-links/get-blog-nav-links.js');

const ARTICLE_CATEGORY_NAME_NOT_EMPTY__ERR_FLASH = config.flashMsgs.validationErr.articleCategory.nameIsEmpty, 
    ARTICLE_CATEGORY_NAME_CHAR_COUNT__ERR_FLASH = config.flashMsgs.validationErr.articleCategory.nameCharCount,
    ARTICLE_CATEGORY__TERM = config.validation.articleCategory.term,
    ARTICLE_CATEGORY_NAMES__MAX_LENGTH = config.validation.articleCategory.maxLength,
    ARTICLE_CATEGORY_NAMES__MIN_LENGTH = config.validation.articleCategory.minLength,
    VIEW_TITLE_NOT_EMPTY__ERR_FLASH = config.flashMsgs.validationErr.viewTitle.notEmpty,
    VIEW_TITLE_CHAR_COUNT__ERR_FLASH = config.flashMsgs.validationErr.viewTitle.charCount, 
    ARTICLE_NAME_NOT_EMPTY__ERR_FLASH = config.flashMsgs.validationErr.articleName.notEmpty, 
    ARTICLE_NAME_CHAR_COUNT__ERR_FLASH = config.flashMsgs.validationErr.articleName.charCount, 
    ARTICLE_NOT_EMPTY__ERR_FLASH = config.flashMsgs.validationErr.article.notEmpty, 
    TEASER_NOT_EMPTY__ERR_FLASH = config.flashMsgs.validationErr.teaser.notEmpty,
    ARTICLE_CATEG__ERR_FLASH = config.flashMsgs.validationErr.articleCateg.notEmpty;

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

function validateCreateArticleCategoryForm(req) {
    req.checkBody(ARTICLE_CATEGORY__TERM)
    .notEmpty().withMessage(ARTICLE_CATEGORY_NAME_NOT_EMPTY__ERR_FLASH)
    .len(ARTICLE_CATEGORY_NAMES__MIN_LENGTH, ARTICLE_CATEGORY_NAMES__MAX_LENGTH).withMessage(ARTICLE_CATEGORY_NAME_CHAR_COUNT__ERR_FLASH)
    .trim();

    let validationErrs = req.validationErrors({
        onlyFirstError: true
    });

    validationErrs = Object.values(validationErrs);
    return validationErrs;z
}

function validateArticleFormData(req) {
    req.checkBody('pageTitle')
    .notEmpty().withMessage(VIEW_TITLE_NOT_EMPTY__ERR_FLASH)
    .len(4, 70)
    .withMessage(VIEW_TITLE_CHAR_COUNT__ERR_FLASH)
    .trim();

    req.checkBody('articleName')
    .notEmpty().withMessage(ARTICLE_NAME_NOT_EMPTY__ERR_FLASH)
    .len(4, 70).withMessage(ARTICLE_NAME_CHAR_COUNT__ERR_FLASH);

    req.checkBody('teasersHtml')
    .notEmpty().withMessage(TEASER_NOT_EMPTY__ERR_FLASH);

    req.checkBody('articleCategories')
    .isLength({ min: 1 }).withMessage(ARTICLE_CATEG__ERR_FLASH);

    req.checkBody('articleHtml')
    .notEmpty().withMessage(ARTICLE_NOT_EMPTY__ERR_FLASH);

    let validationErrs = req.validationErrors({
        onlyFirstError: true
    });

    validationErrs = Object.values(validationErrs);
    return validationErrs;
}

module.exports = {
    getArticleData,
    makeOwnCategsCheckedArr,
    getArticlesDataByCategory,
    getBlogNavLinks,
    getFormattedDate,
    validateCreateArticleCategoryForm,
    validateArticleFormData
}