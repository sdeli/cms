const articlesModel = require('models/articles-model');
const categsOfArticlesModel = require('models/categories-of-articles-model');

let putTeaserOnEachArticlesObj = require('./moduls/put-teasers-on-each-articles-obj/put-teasers-on-each-articles-obj.js');

module.exports = ((config) => {
    let {TEASERS_FOLDERS___PATH} = config;
    
    putTeaserOnEachArticlesObj = putTeaserOnEachArticlesObj({
        TEASERS_FOLDERS___PATH
    });
    
    return getArticlesDataByCategory

    function getArticlesDataByCategory(category) {
        return new Promise((resolve, reject) => {
            articlesModel.getArticlesDataByCategory(category)
            .then(articlesDataByCateg => {
                return Promise.all([
                    putTeaserOnEachArticlesObj(articlesDataByCateg),
                    putOwnCategoriesOnEachArticleObj(articlesDataByCateg),
                    Promise.resolve(articlesDataByCateg)
                ]);
            })
            .then(results => {
                let articlesDataByCateg = results[2];
                resolve(articlesDataByCateg);
            })
            .catch(e => {
                reject(e);
            })
        });
    }

    function putOwnCategoriesOnEachArticleObj(articlesDataByCateg) {
        let allPromises = articlesDataByCateg.map((currArticleDataObj, i) => {
            return new Promise((resolve, reject) => {

                categsOfArticlesModel.getCategoriesOfArticle(currArticleDataObj.articleId)
                .then(currArticlesCategsArr => {
                    attachCategNameInUrl(currArticlesCategsArr);
                    articlesDataByCateg[i].ownCategs = [...currArticlesCategsArr];
                    resolve();
                })
                .catch(e => {
                    reject(e);
                });
            });
        });
    
        return Promise.all(allPromises)
    }

    function attachCategNameInUrl(articleCategories) {
        articleCategories.forEach(articleCateg => {
            articleCateg.articleCategoryNameInUrl = encodeURIComponent(articleCateg.articleCategoryName);
        });
    }
});