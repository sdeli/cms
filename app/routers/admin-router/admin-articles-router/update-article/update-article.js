const config = require('config');
let updateArticleData = require('./moduls/update-article-data/update-article-data.js'); 

const VIEW_TITLE_NOT_EMPTY__ERR_FLASH = config.flashMsgs.validationErr.viewTitle.notEmpty,
    VIEW_TITLE_CHAR_COUNT__ERR_FLASH = config.flashMsgs.validationErr.viewTitle.charCount, 
    ARTICLE_NAME_NOT_EMPTY__ERR_FLASH = config.flashMsgs.validationErr.articleName.notEmpty, 
    ARTICLE_NAME_CHAR_COUNT__ERR_FLASH = config.flashMsgs.validationErr.articleName.charCount, 
    ARTICLE_NOT_EMPTY__ERR_FLASH = config.flashMsgs.validationErr.article.notEmpty, 
    TEASER_NOT_EMPTY__ERR_FLASH = config.flashMsgs.validationErr.teaser.notEmpty,
    TEASERS__PATH = config.absolutePathes.teasersPath,
    ARTICLES__PATH = config.absolutePathes.articlesPath,
    ARTICLE_PROFILE_IMG__PATH = config.relativePathes.public.img.article.profile,
    ARTICLE_PROFILE_IMG__LINK = config.links.article.img.profile,
    EDIT_ARTICLE_VIEW__EP = config.restEndpoints.admin.article.editView,
    UPDATE_ARTICLE__SUCC_FLASH = config.flashMsgs.admin.article.update.succ,
    UPDATE_ARTICLE__ERR_FLASH = config.flashMsgs.admin.article.update.err;

updateArticleData = updateArticleData({
    TEASERS__PATH, 
    ARTICLES__PATH,
    ARTICLE_PROFILE_IMG__PATH,
    ARTICLE_PROFILE_IMG__LINK
});

module.exports = updateArticle;
    
function updateArticle(req, res, next) {
    let validationErrs = validateRegisterFormData(req);

    let articleFormDataCorrect = validationErrs.length === 0;
    if (!articleFormDataCorrect) {
        failureRedirect(req, res, validationErrs);
        return;
    }

    updateArticleData(req)
    .then(() => {
        succRedirect(req, res);
    })
    .catch(e => {
        failureRedirect(req, res, UPDATE_ARTICLE__ERR_FLASH);
        next(e);
    });
}

function validateRegisterFormData(req) {
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

    req.checkBody('articleHtml')
    .notEmpty().withMessage(ARTICLE_NOT_EMPTY__ERR_FLASH);

    validationErrs = req.validationErrors({
        onlyFirstError: true
    });

    var validationErrs = Object.values(validationErrs);
    return validationErrs;
}

function failureRedirect(req, res, errs) {
    let isNotJustASingleErrThanArrOfErrs = Array.isArray(errs);
    if (isNotJustASingleErrThanArrOfErrs) {
        errs.forEach(validationErr => {
            res.flash.toNext(res.flash.WARNING, validationErr.msg);
        });
    } else {
        res.flash.toNext(res.flash.WARNING, errs);
    }
    
    req.session.body = req.body;
    let articleId = req.body.articleId;
    let editArticleViewEp = EDIT_ARTICLE_VIEW__EP.replace(':articleId', articleId);
    res.redirect(editArticleViewEp);
}

function succRedirect(req, res) {
    res.flash.toNext(res.flash.SUCCESS, UPDATE_ARTICLE__SUCC_FLASH);

    let articleId = req.body.articleId;
    let editArticleViewEp = EDIT_ARTICLE_VIEW__EP.replace(':articleId', articleId);

    res.redirect(editArticleViewEp);
}