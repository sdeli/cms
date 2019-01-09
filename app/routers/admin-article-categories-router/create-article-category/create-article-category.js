const articleCategsModel = require('article-categs-model').getInst();

module.exports = ((config) => {
    const {
        ARTICLE_CATEGORY_NAME_NOT_EMPTY__ERR_FLASH, 
        ARTICLE_CATEGORY_NAME_CHAR_COUNT__ERR_FLASH, 
        ARTICLE_CATEGORY_CREATED__SUCC_FLASH,
        ARTICLE_CATEGORY_NOT_UNIQUE__ERR_FLASH,
        CREATE_EDIT_ARTICLE_CATEGORY_VIEW__PATH, 
        CREATE_ARTICLE_CATEGORY_VIEW__TITLE, 
        CREATE_ARTICLE_CATEGORY_VIEW__ID, 
        CREATE_ARTICLE_CATEGORY_EP,
        ARTICLE_CATEGORY_LIST_VIEW__EP,
        ARTICLE_CATEGORY__TERM,
        ARTICLE_CATEGORY_NAMES__MAX_LENGTH,
        ARTICLE_CATEGORY_NAMES__MIN_LENGTH
    } = config;

    return createArticleCategory;
    
    function createArticleCategory(req, res) {
        let validationErrs = validateCreateArticleCategoryForm(req);
        let articleCategoryIsCorrect = validationErrs.length === 0;
        
        if (articleCategoryIsCorrect) {
            articleCategsModel.insertArticleCategoryDataIfUnique(req.body.articleCategory)
            .then(isArticleCategoryUnique => {
                if (isArticleCategoryUnique) {
                    successRedirect(res);
                } else {
                    denyArticleCreation(req, res, ARTICLE_CATEGORY_NOT_UNIQUE__ERR_FLASH);
                }
            }).catch(e => {
                next(e);
            });
        } else {
            denyArticleCreation(req, res, validationErrs);
        }
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
        return validationErrs;
    }
    
    function successRedirect(res) {
        let successMsg = ARTICLE_CATEGORY_CREATED__SUCC_FLASH;
        res.flash.toNext(res.flash.SUCCESS, successMsg);
    
        res.redirect(ARTICLE_CATEGORY_LIST_VIEW__EP);
    }
    
    function denyArticleCreation(req, res, validationErrs) {
        if (Array.isArray(validationErrs)) {
            validationErrs.forEach(validationErr => {
                res.flash.toCurr(res.flash.WARNING, validationErr.msg);
            });
        } else {
            res.flash.toCurr(res.flash.WARNING, validationErrs);
        }
    
        res.render(CREATE_EDIT_ARTICLE_CATEGORY_VIEW__PATH, {
            pageTitle : CREATE_ARTICLE_CATEGORY_VIEW__TITLE,
            pageId : CREATE_ARTICLE_CATEGORY_VIEW__ID,
            postDataToRoute : CREATE_ARTICLE_CATEGORY_EP,
            articleCategoryData : req.body
        });
    }
});