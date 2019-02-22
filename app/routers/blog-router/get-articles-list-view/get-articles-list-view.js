const config = require('config');
const {getArticlesDataByCategory, getBlogNavLinks} = require('widgets/router-utils');

const ARTICLES_BY_CATEG_VIEW__PATH = config.viewPathes.blog.articlesList, 
    ARTICLES_BY_CATEG_VIEW__TITLE = config.templateConf.blog.articlesList.title, 
    ARTICLES_BY_CATEG_VIEW__ID = config.templateConf.blog.articlesList.id;

module.exports = getArticlesBlogView;

function getArticlesBlogView(req, res, next){
    let categ = req.params.articleCategory ? decodeURIComponent(req.params.articleCategory) : false;
    
    Promise.all([
        getArticlesDataByCategory(categ),
        getBlogNavLinks()
    ])
    .then((results) => {
        renderArticlesByCateg(res, results);
    })
    .catch(e => {
        next(e);
    });
}

function renderArticlesByCateg(res, results) {
    res.locals.articlesByCategoryArr = results[0];
    res.locals.navLinks = results[1];
    res.locals.pageTitle = ARTICLES_BY_CATEG_VIEW__TITLE;
    res.locals.pageId = ARTICLES_BY_CATEG_VIEW__ID;

    res.render(ARTICLES_BY_CATEG_VIEW__PATH);
}