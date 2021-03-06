const articlesModel = require('models/articles-model');
const categsOfArticlesModel = require('models/categories-of-articles-model');
const articleCategsModel = require('models/article-categs-model');

const {getFilesContent} = require('widgets/server-utils');
const getOwnCategsCheckedArr = require('./moduls/get-own-categs-checked-arr/get-own-categs-checked-arr.js');

module.exports = ((config) => {
    const {
        ARTICLE_NOT_FOUND__ERR_MSG,
        ARTICLE_CATEGORY_CHECKBOX_GROUP__NAME,
        TEASERS__PATH,
        ARTICLES__PATH
    } = config;

    return getArticleData;
    
    function getArticleData(req) {
        let {articleId} = req.params;
        
        return new Promise((resolve, reject) => {
            Promise.all([
                articlesModel.getArticleData(articleId),
                categsOfArticlesModel.getCategoriesOfArticle(articleId),
                articleCategsModel.getAllArticleCategories()
            ])
            .then(results => {
                if (!doesArticleExist(results)) throw new Error(ARTICLE_NOT_FOUND__ERR_MSG);

                let articleData = assembleArticleDataObj(results)

                return Promise.all([
                    Promise.resolve(articleData),
                    getArticleBodyFromFile(articleData),
                    getTeaserFromFile(articleData)
                ]);
            })
            .then((results) => {
                let articleData = results[0]
                articleData.articleHtml = results[1];
                articleData.teasersHtml = results[2];
                
                resolve(articleData);
            })
            .catch(e => {
                reject(e);
            })
        });

        function doesArticleExist(dbResults) {
            return Boolean(dbResults[0].length);
        }
        
        function assembleArticleDataObj(resultsFromDb) {
            articleData = resultsFromDb[0][0];
            articleData.articleId = articleId;
            articleData.categGroupName = ARTICLE_CATEGORY_CHECKBOX_GROUP__NAME;
            // article categories are displayed as checkboxes so we need the info if a certan categ is already checked or not
            articleData.articleCategories = getOwnCategsCheckedArr(resultsFromDb[1], resultsFromDb[2]);

            return articleData;
        }
        
        function getArticleBodyFromFile(articleData) {
            return getFilesContent(ARTICLES__PATH, articleData.articleFileName);
        }
        
        function getTeaserFromFile(articleData) {
            return getFilesContent(TEASERS__PATH, articleData.teaserFileName);
        }
    }
});