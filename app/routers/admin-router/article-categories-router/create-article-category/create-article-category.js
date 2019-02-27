const config = require('config');
const articleCategsModel = require('models/article-categs-model');
const {getFormattedDate} = require('widgets/router-utils');

const ARTICLE_CATEGORY_NAME_NOT_EMPTY__ERR_FLASH = config.flashMsgs.validationErr.articleCategory.nameIsEmpty, 
    ARTICLE_CATEGORY_NAME_CHAR_COUNT__ERR_FLASH = config.flashMsgs.validationErr.articleCategory.nameCharCount,
    ARTICLE_CATEGORY_CREATED__SUCC_FLASH = config.flashMsgs.admin.articleCategory.create.succ,
    ARTICLE_CATEGORY_NOT_UNIQUE__ERR_FLASH = config.flashMsgs.validationErr.articleCategory.notUnique,
    CREATE_EDIT_ARTICLE_CATEGORY_VIEW__EP = config.restEndpoints.admin.articleCategory.createView,
    ARTICLE_CATEGORY_LIST_VIEW__EP = config.restEndpoints.admin.articleCategory.listView,
    ARTICLE_CATEGORY__TERM = config.validation.articleCategory.term,
    ARTICLE_CATEGORY_NAMES__MAX_LENGTH = config.validation.articleCategory.maxLength,
    ARTICLE_CATEGORY_NAMES__MIN_LENGTH = config.validation.articleCategory.minLength

module.exports = createArticleCategory;

function createArticleCategory(req, res, next) {
    let validationErrs = validateCreateArticleCategoryForm(req);
    let articleCategoryIsCorrect = validationErrs.length === 0;
    
    if (!articleCategoryIsCorrect) {
        failureRedirect(req, res, validationErrs);
        return;
    }
    
    insertArticleCategory(req)
    .then(isArticleCategoryUnique => {
        if (isArticleCategoryUnique) {
            successRedirect(res);
        } else {
            failureRedirect(req, res, ARTICLE_CATEGORY_NOT_UNIQUE__ERR_FLASH);
        }
    })
    .catch(e => {
        next(e);
    });
}

function validateCreateArticleCategoryForm(req) {
    req.checkBody(ARTICLE_CATEGORY__TERM)
    .notEmpty().withMessage(ARTICLE_CATEGORY_NAME_NOT_EMPTY__ERR_FLASH)
    .len(ARTICLE_CATEGORY_NAMES__MIN_LENGTH, ARTICLE_CATEGORY_NAMES__MAX_LENGTH).withMessage(ARTICLE_CATEGORY_NAME_CHAR_COUNT__ERR_FLASH)
    .trim();

    validationErrs = req.validationErrors({
        onlyFirstError: true
    });

    var validationErrs = Object.values(validationErrs);
    return validationErrs;z
}

function insertArticleCategory(req) {
    let articleCategoryName = req.body.articleCategory;
    let createdAt = getFormattedDate();
    return articleCategsModel.insertArticleCategoryDataIfUnique(articleCategoryName, createdAt)
}

function successRedirect(res) {
    let successMsg = ARTICLE_CATEGORY_CREATED__SUCC_FLASH;
    res.flash.toNext(res.flash.SUCCESS, successMsg);

    res.redirect(ARTICLE_CATEGORY_LIST_VIEW__EP);
}

function failureRedirect(req, res, validationErrs) {
    if (Array.isArray(validationErrs)) {
        validationErrs.forEach(validationErr => {
            res.flash.toNext(res.flash.WARNING, validationErr.msg);
        });
    } else {
        res.flash.toNext(res.flash.WARNING, validationErrs);
    }
    
    req.session.body = req.body;
    res.redirect(CREATE_EDIT_ARTICLE_CATEGORY_VIEW__EP);
}