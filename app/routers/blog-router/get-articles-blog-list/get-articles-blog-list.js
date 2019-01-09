const articlesModel = require('articles-model').getInst();
let putTeaserOnEachArticlesObj = require('./moduls/put-teasers-on-each-articles-obj/put-teasers-on-each-articles-obj.js')

module.exports = ((config) => {
    const {
        ARTICLES_BLOG_LIST_VIEW__PATH, 
        ARTICLES_BLOG_LIST_VIEW__TITLE, 
        ARTICLES_BLOG_LIST_VIEW__ID,
        TEASERS_FOLDERS___PATH,
        NO_ARTICLES__ERR_FLASH,
        GET_INDEX_VIEW__EP
    } = config;
    
    putTeaserOnEachArticlesObj = putTeaserOnEachArticlesObj({
        TEASERS_FOLDERS___PATH
    });
    
    return getArticlesBlogList;

    function getArticlesBlogList(req, res, next){
        let articleBlogListData;

        articlesModel.getAllArticlesListData()
        .then(articleBlogListDataResult => {
            let areArticlesInDb = articleBlogListData !== false;
            
            if (areArticlesInDb) {
                articleBlogListData = articleBlogListDataResult;
                return putTeaserOnEachArticlesObj(articleBlogListData)
            } else {
                denyDisplayArticlesBlogList(res);
            }
        })
        .then(() => {
            renderArticles(res, articleBlogListData)
        })
        .catch(e => {
            next(e);
        });
    }

    function renderArticles(res, articleBlogListData) {
        res.render(ARTICLES_BLOG_LIST_VIEW__PATH, {
            pageTitle : ARTICLES_BLOG_LIST_VIEW__TITLE,
            pageId : ARTICLES_BLOG_LIST_VIEW__ID,
            articleBlogListData
        });
    }

    function denyDisplayArticlesBlogList(res) {
        res.flash.toCurr(res.flash.SUCCESS, NO_ARTICLES__ERR_FLASH);
        res.redirect(GET_INDEX_VIEW__EP);
    }
});