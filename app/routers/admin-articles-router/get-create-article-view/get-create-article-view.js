const articleCategsModel = require('article-categs-model').getInst();

module.exports = ((config) => {
    const {
        CREATE_ARTICLE_VIEW__PATH, 
        CREATE_ARTICLE_VIEW__TITLE, 
        CREATE_ARTICLE_VIEW__ID, 
        SEND_ARTICLE_DATA_TO__EP,
        ARTICLE_CATEGORY_CHECKBOX_GROUP__NAME
    } = config;

    return getCreateArticleView;

    function getCreateArticleView(req, res, next) {
        articleCategsModel.getAllArticleCategories()
        .then((results) => {
            let articleCategsArr = results;
            renderCreateArticlePage(res, articleCategsArr);
        })
        .catch(e => {
            denyRenderCreateArticlePage(res);
            next(e);
        });

    }

    function renderCreateArticlePage(res, articleCategories) {
        res.render(CREATE_ARTICLE_VIEW__PATH, {
            pageTitle : CREATE_ARTICLE_VIEW__TITLE,
            pageId : CREATE_ARTICLE_VIEW__ID,
            postDataToRoute : SEND_ARTICLE_DATA_TO__EP,
            articleData : {
                articleCategories,
                categGroupName : ARTICLE_CATEGORY_CHECKBOX_GROUP__NAME,
            }
        });
    }
    
    function denyRenderCreateArticlePage(res) {
        res.redirect('/');
    }
});