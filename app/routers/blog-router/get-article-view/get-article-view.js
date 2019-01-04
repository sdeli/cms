const adminModel = require('admin-model').getInst();
const {getFilesContent} = require('server-utils');

module.exports = ((config) => {
    const {
        ARTICLE_FOLDERS__PATH, 
        ARTICLE__VIEW, 
        ARTICLE_VIEW__ID, 
        WARNING_EVENT,
        ARTICLE_NOT_FOUND,
        FOUR_O_FOUR_VIEW,
        FOUR_O_FOUR_VIEW__TITLE,
        FOUR_O_FOUR_VIEW__ID
    } = config;
    
    return getArticleView;

    function getArticleView(req, res, next){
        let {articleFileName} = req.params

        Promise.all([
            adminModel.getArticleTitleAndName(articleFileName),
            getFilesContent(ARTICLE_FOLDERS__PATH, articleFileName)
        ]).then(articleData => {
            let doesArticleExist = articleData[0] !== false && articleData[1] !== false;

            if (doesArticleExist) {
                var {articleName, pageTitle} = articleData[0],
                articleBody = articleData[1];
                renderArticle(res, articleName, pageTitle, articleBody);
            } else {
                render404page(res);
                throw new Error(ARTICLE_NOT_FOUND);
            }
        })
        .catch(e => {
            next(e);
            // process.emit(WARNING_EVENT, e.stack, req);
        })
    }

    function renderArticle(res, articleName, pageTitle, articleBody) {
        res.render(ARTICLE__VIEW, {
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