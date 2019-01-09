const articlesModel = require('articles-model').getInst();
const categsOfArticlesModel = require('categories-of-articles-model').getInst();

const {getFilesContent} = require('server-utils');

module.exports = ((config) => {
    const {
        ARTICLE_FOLDERS___PATH, 
        ARTICLE_VIEW__PATH, 
        ARTICLE_VIEW__ID, 
        ARTICLE_NOT_FOUND__ERR_MSG,
        FOUR_O_FOUR_VIEW,
        FOUR_O_FOUR_VIEW__TITLE,
        FOUR_O_FOUR_VIEW__ID
    } = config;
    
    return getArticleView;

    function getArticleView(req, res, next){
        req.params.articleId = req.params.articleFileName.match(/(?<=-)[^-]*$/);

        getArticleData(req)
        .then(articleData => {
            renderEditArticleView(res, articleData);
        })
        .then(articleData => {
            let doesArticleExist = articleData[0] !== false && articleData[1] !== false;

            if (doesArticleExist) {
                var {articleName, pageTitle} = articleData[0],
                articleBody = articleData[1];
                renderArticle(res, articleName, pageTitle, articleBody);
            } else {
                render404page(res);
                throw new Error(ARTICLE_NOT_FOUND__ERR_MSG);
            }
        })
        .catch(e => {
            next(e);
            // process.emit(WARNING_EVENT, e.stack, req);
        })
    }

    function renderArticle(res, articleName, pageTitle, articleBody) {
        res.render(ARTICLE_VIEW__PATH, {
            pageTitle : pageTitle,
            pageId : ARTICLE_VIEW__ID,
            articleName,
            articleBody
        });
    }

    function render404page(res) {
        res.render(FOUR_O_FOUR_VIEW, {
            pageTitle : FOUR_O_FOUR_VIEW__TITLE,
            pageId : FOUR_O_FOUR_VIEW__ID
        });
    }
});