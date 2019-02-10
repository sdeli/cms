const uniqid = require('uniqid');
const articlesModel = require('models/articles-model');
const categsOfArticlesModel = require('models/categories-of-articles-model');
const {getValidFileName, saveFile} = require('widgets/server-utils');

module.exports = ((config) => {
    const {
        ARTICLES__PATH,
        TEASERS__PATH
    } = config;

    return saveArticleData;
    
    function saveArticleData(req) {
        req.body.id = uniqid();

        return new Promise((resolve, reject) => {
            Promise.all([
                saveArticleBodyIntoFile(req),
                saveTeaserIntoFile(req)
            ])
            .then((results) => {
                return insertArticleDataIntoDb(req, results); 
            })
            .then(() => {
                return insertCategoriesOfArticleIntoDb(req);
            })
            .then(() => resolve())
            .catch(e => reject(e));
        });
    }
    
    function saveArticleBodyIntoFile(req) {
        let articleBody = req.body.articleHtml;
        let articleFileName = getValidFileName(req.body.articleName, req.body.id);
        let articleFilePath = `${ARTICLES__PATH}/${articleFileName}`;

        return new Promise((resolve, reject) => {
            saveFile(articleFilePath, articleBody)
            .then(() => {
                resolve(articleFileName);
            })
            .catch(e => {
                reject();
            }) 
        });
    }
    
    function saveTeaserIntoFile(req, id) {
        let teaser = req.body.teasersHtml;
        let teaserFileName = `teaser-${req.body.id}`;
        let teaserFilePath = `${TEASERS__PATH}/${teaserFileName}`;

        return new Promise((resolve, reject) => {
            saveFile(teaserFilePath, teaser)
            .then(() => {
                resolve(teaserFileName);
            })
            .catch(e => {
                reject();
            }) 
        });
    }

    function insertArticleDataIntoDb(req, results) {
        let articleData = {
            id : req.body.id, 
            articleName : req.body.articleName,
            pageTitle : req.body.pageTitle,
            articleFileName : results[0],
            teaserFileName : results[1],
            articleProfImgfileName : req.body.articleProfImgfileName
        }
        
        return articlesModel.insertArticleData(articleData);
    }

    function insertCategoriesOfArticleIntoDb(req) {
        let articleId = req.body.id;
        let {articleCategories} = req.body;

        return categsOfArticlesModel.insertArticlesCategories(articleId, articleCategories);
    }
});