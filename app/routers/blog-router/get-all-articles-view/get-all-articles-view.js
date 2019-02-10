const config = require('config');
let getAllArticles = require('./moduls/get-articles-data-by-category/get-articles-data-by-category.js')

const ALL_ARTICLES_VIEW__PATH = config.viewPathes.blog.allArticlesList, 
    ALL_ARTICLES_VIEW__TITLE = config.templateConf.blog.articlesList.title, 
    ALL_ARTICLES_VIEW__ID = config.templateConf.blog.articlesList.id,
    TEASERS_FOLDERS___PATH = config.relativePathes.teasersPath;

getArticlesDataByCategory = getArticlesDataByCategory({
    TEASERS_FOLDERS___PATH
})
    
module.exports = getAllArticles;

function getAllArticles(req, res, next) {
    let categ = req.params.articleCategory;

    getArticlesDataByCategory(categ)
    .then((articlesByCategoryArr) => {
        renderAllArticlesView(res, articlesByCategoryArr)
    })
    .catch(e => {
        next(e);
    });
}

function renderAllArticlesView(res, articlesByCategoryArr) {
    res.render(ALL_ARTICLES_VIEW__PATH, {
        pageTitle : ALL_ARTICLES_VIEW__TITLE,
        pageId : ALL_ARTICLES_VIEW__ID,
        articlesByCategoryArr
    });
}