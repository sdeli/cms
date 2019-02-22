const config = require('config');
const {getArticleData, getBlogNavLinks} = require('widgets/router-utils');

const ARTICLE_VIEW__PATH = config.viewPathes.blog.article, 
    ARTICLE_VIEW__ID = config.templateConf.blog.article.id,
    ARTICLE_VIEW__TITLE = config.templateConf.blog.article.title,
    ARTICLE_NOT_FOUND__ERR_MSG  = config.errorMsgs.general.articleNotFound,
    GET_FOUR_O_FOUR_VIEW__EP = config.restEndpoints.error.fourOfour;

module.exports = getArticleView;

function getArticleView(req, res, next){
    req.params.articleId = req.params.articleFileName.match(/(?<=-)[^-]*$/);

    Promise.all([
        getArticleData(req),
        getBlogNavLinks()
    ])
    .then(results => {
        renderArticle(res, results);
    })
    .catch(err => {
        let articleNotFound = err.message === ARTICLE_NOT_FOUND__ERR_MSG;
        if (articleNotFound) {
            console.log('silent err log');
            res.redirect(GET_FOUR_O_FOUR_VIEW__EP)
        } else {
            next(err);
        }
    });
}

function renderArticle(res, results) {
    res.locals.pageTitle = ARTICLE_VIEW__TITLE;
    res.locals.pageId = ARTICLE_VIEW__ID;
    res.locals.articleData = results[0];
    res.locals.navLinks = results[1];
    
    res.render(ARTICLE_VIEW__PATH);
}