const uniqid = require('uniqid');
const articlesModel = require('models/articles-model');
const categsOfArticlesModel = require('models/categories-of-articles-model');
const {getValidFileName, saveFile} = require('widgets/server-utils');
const {getFormattedDate} = require('widgets/router-utils');

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
            squareArticleProfImgfileName : getSquareArticleProfileImgFileName(req),
            flatArticleProfImgfileName : getFlatArticleProfileImgFileName(req),
            createdAt : getFormattedDate()
        }
        
        return articlesModel.insertArticleData(articleData);
    }

    function getSquareArticleProfileImgFileName(req) {
        let squareArticleProfileImgFileName;
    
        let isSquareProfileImageSentByCurrReq = Boolean(req.files) && Boolean(req.files.squareArticleProfileImg);
        if (isSquareProfileImageSentByCurrReq) {
            squareArticleProfileImgFileName = req.files.squareArticleProfileImg[0].filename;
            return squareArticleProfileImgFileName;
        } 
        
        let hasACurrSquareProfImg = req.body.currSquareArticleProfileImg
        if (hasACurrSquareProfImg) {
            squareArticleProfileImgFileName = req.body.currSquareArticleProfileImg;
        } else {
            squareArticleProfileImgFileName = null;
        }
    
        return squareArticleProfileImgFileName;
    }

    function getFlatArticleProfileImgFileName(req) {
        let flatArticleProfileImgFileName;
    
        let isSquareProfileImageSentByCurrReq = Boolean(req.files) && Boolean(req.files.flatArticleProfileImg);
        if (isSquareProfileImageSentByCurrReq) {
            flatArticleProfileImgFileName = req.files.flatArticleProfileImg[0].filename;
            return flatArticleProfileImgFileName;
        } 
        
        let hasACurrFlatProfImg = req.body.currflatArticleProfileImg
        if (hasACurrFlatProfImg) {
            flatArticleProfileImgFileName = req.body.currflatArticleProfileImg;
        } else {
            flatArticleProfileImgFileName = null;
        }
    
        return flatArticleProfileImgFileName;
    }

    function insertCategoriesOfArticleIntoDb(req) {
        let articleId = req.body.id;
        let {articleCategories} = req.body;

        return categsOfArticlesModel.insertArticlesCategories(articleId, articleCategories);
    }
});