let saveArticleData = require('./moduls/save-article-data/save-article-data.js');

module.exports = ((config) => {
    const {
        VIEW_TITLE_NOT_EMPTY__ERR_FLASH, 
        VIEW_TITLE_CHAR_COUNT__ERR_FLASH, 
        ARTICLE_NAME_NOT_EMPTY__ERR_FLASH, 
        EMAIL_CHAR_COUNT__ERR_FLASH, 
        TEASER_NOT_EMPTY__ERR_FLASH, 
        ARTICLE_NOT_EMPTY__ERR_FLASH, 
        ARTICLE_PUBLISHED__SUCC_FLASH, 
        CREATE_EDIT_ARTICLE_VIEW__PATH, 
        CREATE_ARTICLE_VIEW__TITLE, 
        CREATE_ARTICLE_VIEW__ID, 
        POST_SEND_ARTICLE_DATA_TO__EP,
        ARTICLES_LIST__EP,
        ARTICLES__PATH,
        TEASERS__PATH,
    } = config;

    saveArticleData = saveArticleData({
        ARTICLES__PATH,
        TEASERS__PATH,
    });

    return createArticle;
    
    function createArticle(req, res, next) {
        let validationErrs = validateFormData(req);
        let articleDataCorrect = validationErrs.length === 0;
        
        if (!articleDataCorrect) {
            denyPublishArticle(req, res, validationErrs);
            return;
        }

        saveArticleData(req)
        .then(() => {
            notifAboutPublishedArticle(res);
        }).catch(e => {
            next(e);
        });
    }
    
    function validateFormData(req) {
        let isArticleProfileImageSentByCurrReq = Boolean(req.file);
        if (isArticleProfileImageSentByCurrReq) {
            req.body.articleProfImgfileName = req.file.filename;
        } else {
            req.body.articleProfImgfileName = null;
        }

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

        req.checkBody('articleCategories')
        .isLength({ min: 1 }).withMessage("TEASER_NOT_EMPTY__ERR_FLASH");
        
        req.checkBody('articleHtml')
        .notEmpty().withMessage(ARTICLE_NOT_EMPTY__ERR_FLASH);

        validationErrs = req.validationErrors({
            onlyFirstError: true
        });
    
        var validationErrs = Object.values(validationErrs);
        return validationErrs;
    }
    
    function notifAboutPublishedArticle(res) {
        let successMsg = ARTICLE_PUBLISHED__SUCC_FLASH;
        res.flash.toNext(res.flash.SUCCESS, successMsg);
    
        res.redirect(ARTICLES_LIST__EP);
    }
    
    function denyPublishArticle(req, res, validationErrs) {
        validationErrs.forEach(validationErr => {
            res.flash.toCurr(res.flash.WARNING, validationErr.msg);
        });
    
        res.render(CREATE_EDIT_ARTICLE_VIEW__PATH, {
            pageTitle : CREATE_ARTICLE_VIEW__TITLE,
            pageId : CREATE_ARTICLE_VIEW__ID,
            postDataToRoute : POST_SEND_ARTICLE_DATA_TO__EP,
            articleData : req.body
        });
    }
});