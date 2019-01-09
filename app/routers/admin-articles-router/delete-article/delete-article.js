const articlesModel = require('articles-model').getInst();

const {deleteFile} = require('server-utils');

module.exports = ((config) => {
    const {TEASERS__PATH, ARTICLES__PATH, SUCC_REDIRECT__EP, DELETE_ARTICLE__SUCC_FLASH, DELETE_ARTICLE__ERR_FLASH} = config;

    return deleteArticle;

    function deleteArticle(req, res) {
        let {articleId} = req.params;

        articlesModel.deleteArticleData(articleId)
        .then((deletedArticle) => {
            return Promise.all([
                deleteFile(`${ARTICLES__PATH}/${deletedArticle.bodysCurrFile}`),
                deleteFile(`${TEASERS__PATH}/${deletedArticle.teasersCurrFile}`)
            ]);
        })
        .then((results) => {
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
});