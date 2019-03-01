const config = require('config');
const articlesModel = require('models/articles-model');
const {deleteFile} = require('widgets/server-utils');
const errHandler = require('widgets/error-handler');

const TEASERS__PATH = config.absolutePathes.teasersPath, 
  ARTICLES__PATH = config.absolutePathes.articlesPath,
  SUCC_REDIRECT__EP = config.restEndpoints.admin.article.ListView,
  DELETE_ARTICLE__SUCC_FLASH = config.flashMsgs.admin.article.delete.succ,
  DELETE_ARTICLE__ERR_FLASH = config.flashMsgs.admin.article.delete.err,
  ARTICLE_PROFILE_IMAGES__PATH = config.relativePathes.public.img.article.profile;
  
module.exports = deleteArticle;

function deleteArticle(req, res) {
    let {articleId} = req.params;

    articlesModel.deleteArticleData(articleId)
    .then((deletedArticle) => {
        if (deletedArticle) {
            return deleteFilesOfArticle(deletedArticle)
        } else {
            throw new Error('Article_Not_Found_in_db');
        }
    })
    .then(() => {
        redirect('success', res);
    })
    .catch(err => {
        let articleNotFoundInDb = err.message === 'Article_Not_Found_in_db';
        if (articleNotFoundInDb) {
            redirect('deny', res);
            errHandler(err, req);
        } else {
            next(err);
        }
    })
}

function deleteFilesOfArticle(deletedArticle) {
    let deleteFilesProms = [
        deleteFile(`${ARTICLES__PATH}/${deletedArticle.bodysCurrFile}`),
        deleteFile(`${TEASERS__PATH}/${deletedArticle.teasersCurrFile}`)
    ]

    let hasSquareProfImg = Boolean(deletedArticle.squareArticleProfileImgFileName);
    if (hasSquareProfImg) {
        let imgFileName = deletedArticle.squareArticleProfileImgFileName
        deleteFilesProms.push(deleteFile(`${ARTICLE_PROFILE_IMAGES__PATH}/${imgFileName}`))
    }
    
    let hasFlatProfImg = Boolean(deletedArticle.flatArticleProfileImgFileName);
    if (hasFlatProfImg) {
        let imgFileName = deletedArticle.flatArticleProfileImgFileName
        deleteFilesProms.push(deleteFile(`${ARTICLE_PROFILE_IMAGES__PATH}/${imgFileName}`))
    }

    return Promise.all(deleteFilesProms);
}

function redirect(type, res) {
    if (type === 'success') {
        res.flash.toNext(res.flash.SUCCESS, DELETE_ARTICLE__SUCC_FLASH);
    } else if ('deny') {
        res.flash.toNext(res.flash.WARNING, DELETE_ARTICLE__ERR_FLASH);
    }

    // ajax will redirect on front end
    res.send(SUCC_REDIRECT__EP);
} 