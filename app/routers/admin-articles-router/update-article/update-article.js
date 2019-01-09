let updateArticleData = require('./moduls/update-article-data/update-article-data.js'); 

module.exports = ((config) => {
    const {
        VIEW_TITLE_NOT_EMPTY__ERR_FLASH,
        VIEW_TITLE_CHAR_COUNT__ERR_FLASH,
        ARTICLE_NAME_NOT_EMPTY__ERR_FLASH,
        EMAIL_CHAR_COUNT__ERR_FLASH,
        TEASER_NOT_EMPTY__ERR_FLASH,
        ARTICLE_NOT_EMPTY__ERR_FLASH,
        TEASERS__PATH, 
        ARTICLES__PATH,
        ARTICLE_PROFILE_IMG__PATH,
        ARTICLE_PROFILE_IMG__LINK,
        EDIT_ARTICLE_VIEW__PATH,
        EDIT_ARTICLE_VIEW__EP,
        EDIT_ARTICLE_VIEW__ID, 
        EDIT_ARTICLE_VIEW__TITLE, 
        UPDATE_ARTICLE__EP,
        UPDATE_ARTICLE__SUCC_FLASH, 
        UPDATE_ARTICLE__ERR_FLASH, 
    } = config;
    
    updateArticleData = updateArticleData({
        TEASERS__PATH, 
        ARTICLES__PATH,
        ARTICLE_PROFILE_IMG__PATH,
        ARTICLE_PROFILE_IMG__LINK
    });
    
    return updateArticle;
    
    function updateArticle(req, res, next) {
        let validationErrs = validateRegisterFormData(req);

        let articleFormDataCorrect = validationErrs.length === 0;
        if (!articleFormDataCorrect) {
            denyUpdateArticle(req, res, validationErrs);
            return;
        }

        updateArticleData(req)
        .then(() => {
            redirectToEditUpdatedArticlePage(req, res);
        })
        .catch(e => {
            denyUpdateArticle(req, res, UPDATE_ARTICLE__ERR_FLASH);
            next(e);
        });
    }

    function validateRegisterFormData(req) {
        req.checkBody('pageTitle')
        .notEmpty().withMessage(VIEW_TITLE_NOT_EMPTY__ERR_FLASH)
        .len(4, 25)
        .withMessage(VIEW_TITLE_CHAR_COUNT__ERR_FLASH)
        .trim();
    
        req.checkBody('articleName')
        .notEmpty().withMessage(ARTICLE_NAME_NOT_EMPTY__ERR_FLASH)
        .len(4, 25).withMessage(EMAIL_CHAR_COUNT__ERR_FLASH);
    
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

    function denyUpdateArticle(req, res, errs) {
        let isNotJustASingleErrThanArrOfErrs = Array.isArray(errs);
        if (isNotJustASingleErrThanArrOfErrs) {
            validationErrs.forEach(validationErr => {
                res.flash.toCurr(res.flash.WARNING, validationErr.msg);
            });
        } else {
            res.flash.toCurr(res.flash.WARNING, errs);
        }
    
        res.render(EDIT_ARTICLE_VIEW__PATH, {
            pageTitle : `${EDIT_ARTICLE_VIEW__TITLE} ${req.body.articleName}`,
            pageId : EDIT_ARTICLE_VIEW__ID,
            postDataToRoute : UPDATE_ARTICLE__EP,
            articleData : req.body
        });
    }
    
    function redirectToEditUpdatedArticlePage(req, res) {
        res.flash.toNext(res.flash.SUCCESS, UPDATE_ARTICLE__SUCC_FLASH);

        let articleId = req.body.articleId;
        let editArticleViewEp = EDIT_ARTICLE_VIEW__EP.replace(':articleId', articleId);

        res.redirect(editArticleViewEp);
    }
});