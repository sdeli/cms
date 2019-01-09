const articleCategsModel = require('article-categs-model').getInst();

module.exports = ((config) => {
    // create closure for config constants
    const {
        EDIT_ARTICLE_CATEGORY_VIEW__PATH,
        EDIT_ARTICLE_CATEGORY_VIEW__ID,
        EDIT_ARTICLE_CATEGORY_VIEW__TITLE,
        UPDATE_ARTICLE_CATEGORY__EP,
        UPDATE_ARTICLE_CATEGORY__SUCC_FLASH,
        UPDATE_ARTICLE_CATEGORY__ERR_FLASH,
        WARNING_EVENT
    } = config;

    // route start
    return updateArticleCategory;
    
    function updateArticleCategory(req, res) {
        let articleCategoryData = {
            currName : req.body.currArticleCategoryName,
            newName :  req.body.articleCategory
        }

        articleCategsModel.updateArticleCategoryName(articleCategoryData)
        .then(() => {
            renderEditArticleView('success', res, articleCategoryData.newName);
        })
        .catch(e => {
            process.emit(WARNING_EVENT, e.stack, req);
            renderEditArticleView('deny', res, articleCategoryData.currName);
        });
    }
    
    function renderEditArticleView(type, res, currArticleCategoryName) {
        if (type === 'success') {
            res.flash.toCurr(res.flash.SUCCESS, UPDATE_ARTICLE_CATEGORY__SUCC_FLASH);
        } else if ('deny') {
            res.flash.toCurr(res.flash.WARNING, UPDATE_ARTICLE_CATEGORY__ERR_FLASH);
        }

        res.render(EDIT_ARTICLE_CATEGORY_VIEW__PATH, {
            pageTitle : `${EDIT_ARTICLE_CATEGORY_VIEW__TITLE} ${currArticleCategoryName}`,
            pageId : EDIT_ARTICLE_CATEGORY_VIEW__ID,
            postDataToRoute : UPDATE_ARTICLE_CATEGORY__EP,
            articleCategoryName : currArticleCategoryName
        });
    } 
});