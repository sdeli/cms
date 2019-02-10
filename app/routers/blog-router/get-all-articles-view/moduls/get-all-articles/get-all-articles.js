const articlesModel = require('models/articles-model');

let putTeaserOnEachArticlesObj = require('./moduls/put-teasers-on-each-articles-obj/put-teasers-on-each-articles-obj.js');

module.exports = ((config) => {
    let {TEASERS_FOLDERS___PATH} = config;
    
    putTeaserOnEachArticlesObj = putTeaserOnEachArticlesObj({
        TEASERS_FOLDERS___PATH
    });
    
    return getAllArticlesWithCategs

    function getAllArticlesWithCategs(category) {
        return new Promise((resolve, reject) => {
            articlesModel.getAllArticlesWithCategs(category)
            .then(articlesDataByCateg => {
                return putTeaserOnEachArticlesObj(articlesDataByCateg)
            })
            .then(articlesDataByCateg => {
                resolve(articlesDataByCateg);
            })
            .catch(e => {
                reject(e);
            })
        });
    }
});