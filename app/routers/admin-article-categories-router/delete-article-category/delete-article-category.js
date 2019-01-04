const adminModel = require('admin-model').getInst();

const {deleteFile} = require('server-utils');

function majom(type) {
    return function(name) {
        console.log(type);
        console.log(name);
    }
}

module.exports = ((config) => {
    const {
        SUCC_REDIRECT__EP, 
        DELETE_ARTICLE_CATEGORY__SUCC_FLASH, 
        DELETE_ARTICLE_CATEGORY__ERR_MSG,
        WARNING_EVENT
    } = config;

    return deleteArticleCategory;

    function deleteArticleCategory(req, res) {
        let {articleCategoryName} = req.params;

        adminModel.deleteArticleCategory(articleCategoryName)
        .then((affectedRows) => {
            redirect('success', res);
        })
        .catch(e => {
            redirect('deny', res);
            process.emit(WARNING_EVENT, e.stack, req);
        })
    }

    function redirect(type, res) {
        if (type === 'success') {
            res.flash.toNext(res.flash.SUCCESS, DELETE_ARTICLE_CATEGORY__SUCC_FLASH);
        } else if ('deny') {
            res.flash.toNext(res.flash.WARNING, DELETE_ARTICLE_CATEGORY__ERR_MSG);
        }

        res.redirect(SUCC_REDIRECT__EP);
    } 
});