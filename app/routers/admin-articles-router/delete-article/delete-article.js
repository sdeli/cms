const adminModel = require('admin-model').getInst();

const {deleteFile} = require('server-utils');

module.exports = ((config) => {
    const {TEASERS_PATH, ARTICLES_PATH, SUCC_REDIRECT__EP, DELETE_ARTICLE__SUCC_FLASH, DELETE_ARTICLE__ERR_FLASH} = config;

    return deleteArticle;

    function deleteArticle(req, res) {
        let {articleId} = req.params;

        adminModel.deleteArticleData(articleId)
        .then((deletedArticle) => {
            return Promise.all([
                deleteFile(`${ARTICLES_PATH}/${deletedArticle.bodysCurrFile}`),
                deleteFile(`${TEASERS_PATH}/${deletedArticle.teasersCurrFile}`)
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