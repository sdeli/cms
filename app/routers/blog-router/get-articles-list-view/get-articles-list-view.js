const config = require('config');
let getArticlesDataByCategory = require('./moduls/get-articles-data-by-category/get-articles-data-by-category.js')

const ARTICLES_BY_CATEG_VIEW__PATH = config.viewPathes.blog.articlesList, 
    ARTICLES_BY_CATEG_VIEW__TITLE = config.templateConf.blog.articlesList.title, 
    ARTICLES_BY_CATEG_VIEW__ID = config.templateConf.blog.articlesList.id,
    TEASERS_FOLDERS___PATH = config.relativePathes.teasersPath;

getArticlesDataByCategory = getArticlesDataByCategory({
    TEASERS_FOLDERS___PATH
})
    
module.exports = getArticlesBlogView;

function getArticlesBlogView(req, res, next){
    let categ = req.params.articleCategory;

    getArticlesDataByCategory(categ)
    .then((articlesByCategoryArr) => {
        renderArticlesByCateg(res, articlesByCategoryArr)
    })
    .catch(e => {
        next(e);
    });
}

function renderArticlesByCateg(res, articlesByCategoryArr) {
    res.render(ARTICLES_BY_CATEG_VIEW__PATH, {
        pageTitle : ARTICLES_BY_CATEG_VIEW__TITLE,
        pageId : ARTICLES_BY_CATEG_VIEW__ID,
        articlesByCategoryArr
    });
}