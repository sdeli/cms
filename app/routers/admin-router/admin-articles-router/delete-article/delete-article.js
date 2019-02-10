const config = require('config');
const articlesModel = require('models/articles-model');
const {deleteFile} = require('widgets/server-utils');

const TEASERS__PATH = config.absolutePathes.teasersPath, 
  ARTICLES__PATH = config.absolutePathes.articlesPath,
  SUCC_REDIRECT__EP = config.restEndpoints.admin.article.ListView,
  DELETE_ARTICLE__SUCC_FLASH = config.flashMsgs.admin.article.delete.succ,
  DELETE_ARTICLE__ERR_FLASH = config.flashMsgs.admin.article.delete.err

module.exports = deleteArticle;

function deleteArticle(req, res) {
    let {articleId} = req.params;

    articlesModel.deleteArticleData(articleId)
    .then((deletedArticle) => {
        return Promise.all([
            deleteFile(`${ARTICLES__PATH}/${deletedArticle.bodysCurrFile}`),
            deleteFile(`${TEASERS__PATH}/${deletedArticle.teasersCurrFile}`)
        ]);
    })
    .then(() => {
        redirect('success', res);
    })
    .catch(e => {
        console.log(e);
        redirect('deny', res);
    })
}

function redirect(type, res) {
    if (type === 'success') {
        res.flash.toNext(res.flash.SUCCESS, DELETE_ARTICLE__SUCC_FLASH);
    } else if ('deny') {
        res.flash.toNext(res.flash.WARNING, DELETE_ARTICLE__ERR_FLASH);
    }

    res.redirect(SUCC_REDIRECT__EP);
} 