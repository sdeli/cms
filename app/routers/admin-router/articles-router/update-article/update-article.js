const config = require('config');
const {validateArticleFormData} = require('widgets/router-utils');
let updateArticleData = require('./moduls/update-article-data/update-article-data.js'); 

const TEASERS__PATH = config.absolutePathes.teasersPath,
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
    let validationErrs = validateArticleFormData(req);

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
    
    // front end will redirect
    res.send(editArticleViewEp);
}

function succRedirect(req, res) {
    res.flash.toNext(res.flash.SUCCESS, UPDATE_ARTICLE__SUCC_FLASH);

    let articleId = req.body.articleId;
    let editArticleViewEp = EDIT_ARTICLE_VIEW__EP.replace(':articleId', articleId);
    // front end will redirect
    res.send(editArticleViewEp);
}