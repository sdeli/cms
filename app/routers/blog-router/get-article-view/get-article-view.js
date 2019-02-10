const config = require('config');
const routerUtils = require('widgets/router-utils');

const ARTICLE_VIEW__PATH = config.viewPathes.blog.article, 
    ARTICLE_VIEW__ID = config.templateConf.blog.article.id, 
    FOUR_O_FOUR_VIEW = config.viewPathes.fourOFour,
    FOUR_O_FOUR_VIEW__TITLE = config.templateConf.fourOFour.title,
    FOUR_O_FOUR_VIEW__ID = config.templateConf.fourOFour.id;
                                    
module.exports = getArticleView;

function getArticleView(req, res, next){
    req.params.articleId = req.params.articleFileName.match(/(?<=-)[^-]*$/);

    routerUtils.getArticleData(req)
    .then(articleData => {
        renderArticle(res, articleData);
    })
    .catch(e => {
        next(e);
        render404page(res)
    })
}

function renderArticle(res, articleData) {
    res.render(ARTICLE_VIEW__PATH, {
        pageTitle : articleData.pageTitle,
        pageId : ARTICLE_VIEW__ID,
        articleData
    });
}

function render404page(res) {
    res.render(FOUR_O_FOUR_VIEW, {
        pageTitle : FOUR_O_FOUR_VIEW__TITLE,
        pageId : FOUR_O_FOUR_VIEW__ID
    });
}