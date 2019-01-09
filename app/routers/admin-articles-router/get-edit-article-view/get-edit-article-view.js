let {getArticleData} = require('server-utils');

module.exports = ((config) => {
    let {
        ARTICLE_NOT_FOUND__ERR_MSG,
        EDIT_ARTICLE_VIEW__PATH, 
        EDIT_ARTICLE_VIEW__TITLE, 
        EDIT_ARTICLE_VIEW__ID, 
        UPDATE_ARTICLE__EP, 
        FAILURE_REDIRECT__EP,
        FALIRUE__ERR_FLASH,
        ARTICLE_CATEGORY_CHECKBOX_GROUP__NAME,
        TEASERS__PATH,
        ARTICLES__PATH
    } = config;
    
    getArticleData = getArticleData({
        ARTICLE_NOT_FOUND__ERR_MSG,
        ARTICLE_CATEGORY_CHECKBOX_GROUP__NAME,
        TEASERS__PATH,
        ARTICLES__PATH
    });
    
    return getEditArticleView;

    function getEditArticleView(req, res, next) {
        getArticleData(req)
        .then(articleData => {
            renderEditArticleView(res, articleData);
        })
        .catch(e => {
            failureRedirect(res)
            next(e);
        });
    }
    
    function renderEditArticleView(res, articleData) {
        res.render(EDIT_ARTICLE_VIEW__PATH, {
            pageTitle : `${EDIT_ARTICLE_VIEW__TITLE} ${articleData.articleName}`,
            pageId : EDIT_ARTICLE_VIEW__ID,
            postDataToRoute : UPDATE_ARTICLE__EP,
            articleData
        });
    }

    function failureRedirect(res) {
        res.flash.toNext(res.flash.WARNING, FALIRUE__ERR_FLASH);
        res.redirect(FAILURE_REDIRECT__EP);
    }
});