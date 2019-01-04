const adminModel = require('admin-model').getInst();
const {getFilesContent} = require('server-utils');

module.exports = ((config) => {
    let {TEASERS_PATH, ARTICLES_PATH, EDIT_ARTICLE__VIEW, EDIT_ARTICLE_VIEW__TITLE, EDIT_ARTICLE_VIEW__ID, UPDATE_ARTICLE__EP, FILE_DOESNT_EXIST__ERR_MSG} = config;

    return getEditArticleView;

    function getEditArticleView(req, res) {
        let {articleId} = req.params;
        let articleData;
    
        adminModel.getArticle(articleId)
        .then(({results}) => {
            articleData = results[0];
            articleData.articleId = articleId;
            
            return Promise.all([
                getFilesContent(ARTICLES_PATH, articleData.articleFileName),
                getFilesContent(TEASERS_PATH, articleData.teaserFileName)
            ]);
        }).then(results => {
            let fileExists = results[0] !== false;
                fileExists &= results[1] !== false;

            if (fileExists) {
                articleData.articleHtml = results[0];
                articleData.teasersHtml = results[1];
                renderEditArticleView(res, articleData);
            } else {
                throw new Error()
            }
        })
        .catch(e => {
            console.log(e);
        });
    }
    
    function renderEditArticleView(res, articleData) {
        res.render(EDIT_ARTICLE__VIEW, {
            pageTitle : `${EDIT_ARTICLE_VIEW__TITLE} ${articleData.articleName}`,
            pageId : EDIT_ARTICLE_VIEW__ID,
            postDataToRoute : UPDATE_ARTICLE__EP,
            articleData
        });
    }
});