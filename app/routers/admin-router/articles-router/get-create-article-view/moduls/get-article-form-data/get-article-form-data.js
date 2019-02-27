const articleCategsModel = require('models/article-categs-model');
const routerUtils = require('widgets/router-utils');

module.exports = ((config) => {
    const {
        ARTICLE_CATEGORY_CHECKBOX_GROUP__NAME
    } = config;
    
    return getArticleFormData;
    
    function getArticleFormData(req) {
        return new Promise((resolve, reject) => {
            articleCategsModel.getAllArticleCategories()
            .then(articleCategsArr => {
                articleFormDataObj = assembleArticleFormDataObj(req, articleCategsArr);
                resolve(articleFormDataObj);        
            })
            .catch(e => {
                reject(e);
            }); 
        });
    }

    function assembleArticleFormDataObj(req, articleCategsArr) {
        let isReqFromPrevValidationErr = Boolean(Object.keys(req.body).length);
        if (isReqFromPrevValidationErr) {
            var articleData = req.body;
            articleData.articleCategories = routerUtils.makeOwnCategsCheckedArr(req, articleCategsArr);
            articleData.categGroupName = ARTICLE_CATEGORY_CHECKBOX_GROUP__NAME;
        } else {
            var articleData = {
                articleCategories : articleCategsArr,
                categGroupName : ARTICLE_CATEGORY_CHECKBOX_GROUP__NAME,
            }
        }
           
        return articleData;
    }
})