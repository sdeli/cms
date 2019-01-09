const {getFilesContent} = require('server-utils');

module.exports = ((config) => {
    const {
        TEASERS_FOLDERS___PATH
    } = config;

    return putTeaserOnEachArticlesObj

    function putTeaserOnEachArticlesObj(articleBlogListData) {
        let allPromises = [];
    
        articleBlogListData.forEach(articleData => {
            allPromises.push(putTeaserOnArticleDataObj(articleData));
        });
    
        return Promise.all(allPromises)
    }
    
    function putTeaserOnArticleDataObj(articleData) {
        return new Promise((resolve, reject) => {
            getFilesContent(TEASERS_FOLDERS___PATH, articleData.teasersFileName)
            .then(teaser => {
                articleData.teaser = teaser;
                resolve(true);
            })
            .catch(e => {
                reject(false);
            })
        });
    }
});
