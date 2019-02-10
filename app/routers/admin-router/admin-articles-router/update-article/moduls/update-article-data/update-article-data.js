const articlesModel = require('models/articles-model');
const categsOfArticlesModel = require('models/categories-of-articles-model');

let updateFilesOfArticle = require('./moduls/update-files-of-article/update-files-of-article.js');

const {getValidFileName} = require('widgets/server-utils');

module.exports = ((config) => {
    let {
        TEASERS__PATH, 
        ARTICLES__PATH,
        ARTICLE_PROFILE_IMG__PATH,
        ARTICLE_PROFILE_IMG__LINK
    } = config;
    
    updateFilesOfArticle = updateFilesOfArticle({
        TEASERS__PATH, 
        ARTICLES__PATH,
        ARTICLE_PROFILE_IMG__PATH
    });
    
    return updateArticleData

    function updateArticleData(req) {
        let newArticleDetails = getNewArticleDetailsOb(req);
        newArticleDetails.articleProfImgLink = getArticleProfImgLink(req);
        
        return new Promise((resolve, reject) => {
            Promise.all([
                articlesModel.updateArticleData(newArticleDetails),
                updateCategoriesOfArticleInDb(req)
            ])
            .then(results => {
                let updatedArticleDataFromDb = results[0] 
                return updateFilesOfArticle(req, updatedArticleDataFromDb, newArticleDetails)
            })
            .then(() => resolve())
            .catch(e => {
                reject(e)
            });
        });
    }
    
    function getNewArticleDetailsOb(req) {
        let articleId = req.body.articleId; 
        let articleFileName = getValidFileName(req.body.articleName, articleId); 
    
        let newArticleDetails = {
            articleId, 
            articleName : req.body.articleName,
            pageTitle : req.body.pageTitle,
            articleFileName,
            teasersHtml : req.body.teasersHtml,
            articleHtml : req.body.articleHtml
        }
    
        let isArticleProfileImageSentByCurrReq = Boolean(req.file);
        if (isArticleProfileImageSentByCurrReq) {
            newArticleDetails.articleProfImgfileName = req.file.filename;
        } else {
            newArticleDetails.articleProfImgfileName = null;
        }
    
        return newArticleDetails;
    }
    
    function getArticleProfImgLink(req) {
        let articleProfImgLink;
    
        let isArticleProfileImageSentByCurrReq = Boolean(req.file);
        if (isArticleProfileImageSentByCurrReq) {
            articleProfImgLink = `${ARTICLE_PROFILE_IMG__LINK}/${req.file.filename}`;
        } else {
            articleProfImgLink = req.body.articleProfImgLink;
        }
    
        return articleProfImgLink;
    }

    function updateCategoriesOfArticleInDb(req) {
        let {articleId, articleCategories} = req.body;
        
        return categsOfArticlesModel.updateCategoriesOfArticle(articleId, articleCategories);
    }
});