const articleCategsModel = require('models/article-categs-model');
const routerUtils = require('widgets/router-utils');

module.exports = ((config) => {
    const {
        ARTICLE_CATEGORY_CHECKBOX_GROUP__NAME
    } = config;

    return getArticleData;

    function getArticleData(req) {
        isRequestFromPrevValidationErr = Boolean(Object.keys(req.body).length);
        if (isRequestFromPrevValidationErr) {
            return getArticleDataAfterValidationErr(req);
        } else {
            return routerUtils.getArticleData(req)
        }
    }
    
    function getArticleDataAfterValidationErr(req) {
        return new Promise((resolve, reject) => {
            articleCategsModel.getAllArticleCategories()
            .then(articleCategsArr => {
                let articleData = assembleArticleFormDataObj(req, articleCategsArr);
                resolve(articleData);
            })
            .catch(e => {
                reject(e);
            })
        });
    }
    
    function assembleArticleFormDataObj(req, articleCategsArr) {
        var articleData = req.body;
        articleData.articleCategories = routerUtils.makeOwnCategsCheckedArr(req, articleCategsArr);
        articleData.categGroupName = ARTICLE_CATEGORY_CHECKBOX_GROUP__NAME;
    
        return articleData;
    }
});