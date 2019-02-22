const articleCategsModel = require('models/article-categs-model');

module.exports = ((config) => {
    const {
        blogNavStaticEndPoints
    } = config;
    let navLinks = Object.assign({}, blogNavStaticEndPoints);
    
    return getBlogNavLinks;
    
    function getBlogNavLinks() {

        return new Promise((resolve, reject) => {
            articleCategsModel.getAllArticleCategories()
            .then(articleCategs => {
                navLinks.articleCategs = createArticleCategLinks(articleCategs);
                resolve(navLinks);
            })
            .catch(err => {
                reject(err);
            });
        });
    }


    function createArticleCategLinks(articleCategs) {
        let getArticlesByCategViewEp = blogNavStaticEndPoints.articlesList.ep;

        let articleCategLinks = articleCategs.map(articleCategObj => {
            let articleCategUrlParam = encodeURIComponent(articleCategObj.articleCategoryName);
            let articleCategEp = `${getArticlesByCategViewEp}/${articleCategUrlParam}`;

            return {
                text : articleCategObj.articleCategoryName,
                articleCategEp
            };
        });

        return articleCategLinks;
    }
});
