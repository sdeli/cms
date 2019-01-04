const adminModel = require('admin-model').getInst();

module.exports = ((config) => {
    let {
        ARTICLE_CATEGORY_NOT_FOUND_IN_DB__ERR_MSG, 
        UNEXPECTED_ERR_EVENT__ERR_FLASH,
        EDIT_ARTICLE_CATEGORY__VIEW,
        EDIT_ARTICLE_CATEGORY_VIEW__TITLE, 
        EDIT_ARTICLE_CATEGORY_VIEW__ID, 
        UPDATE_ARTICLE_CATEGORY__EP,
        FAILURE_REDIRECT__EP,
        WARNING_EVENT
    } = config;

    return getEditArticleCategoryView;

    function getEditArticleCategoryView(req, res) {
        let {articleCategoryName} = req.params;
    
        adminModel.checkIfArticleCategExists(articleCategoryName)
        .then((doesArticleCategExists) => {
            if (doesArticleCategExists) {
                renderEditArticleView(res, articleCategoryName)
            } else {
                denyEditArticle(res)
                throw new Error(ARTICLE_CATEGORY_NOT_FOUND_IN_DB__ERR_MSG);
            }
        })
        .catch(e => {
            denyEditArticle(res)
            process.emit(WARNING_EVENT, e.stack, req);
        });
    }
    
    function renderEditArticleView(res, articleCategoryName) {
        res.render(EDIT_ARTICLE_CATEGORY__VIEW, {
            pageTitle : `${EDIT_ARTICLE_CATEGORY_VIEW__TITLE} ${articleCategoryName}`,
            pageId : EDIT_ARTICLE_CATEGORY_VIEW__ID,
            postDataToRoute : UPDATE_ARTICLE_CATEGORY__EP,
            articleCategoryName
        });
    }

    function denyEditArticle(res) {
        res.flash.toNext(res.flash.WARNING, UNEXPECTED_ERR_EVENT__ERR_FLASH);
        res.redirect(FAILURE_REDIRECT__EP);
    }
});