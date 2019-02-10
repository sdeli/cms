const {getFilesContent} = require('widgets/server-utils');

module.exports = ((config) => {
    const {
        TEASERS_FOLDERS___PATH
    } = config;

    return putTeaserOnEachArticlesObj

    function putTeaserOnEachArticlesObj(articlesDataByCateg) {
        let allPromises = articlesDataByCateg.map((currArticlesDataObj, i) => {
            return putTeaserOnArticleObj(currArticlesDataObj);
        });
    
        return Promise.all(allPromises)
    }
    
    function putTeaserOnArticleObj(currArticlesDataObj) {
        return new Promise((resolve, reject) => {
            getFilesContent(TEASERS_FOLDERS___PATH, currArticlesDataObj.teaserFileName)
            .then(teaser => {
                currArticlesDataObj.teaser = teaser;
                resolve();
            })
            .catch(e => {
                reject(e);
            })
        });
    }
});
