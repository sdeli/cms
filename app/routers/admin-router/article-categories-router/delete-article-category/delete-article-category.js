const config = require('config');
const articleCategsModel = require('models/article-categs-model');

const SUCC_REDIRECT__EP = config.restEndpoints.admin.articleCategory.listView, 
    DELETE_ARTICLE_CATEGORY__SUCC_FLASH = config.flashMsgs.admin.articleCategory.delete.succ, 
    DELETE_ARTICLE_CATEGORY__ERR_MSG = config.flashMsgs.admin.articleCategory.delete.err;
    
module.exports = deleteArticleCategory;
    
function deleteArticleCategory(req, res) {
    let {articleCategoryName} = req.params;
        articleCategoryName = decodeURIComponent(articleCategoryName);
        
    articleCategsModel.deleteArticleCategory(articleCategoryName)
    .then((wasArticleCategoryInDb) => {
        if (wasArticleCategoryInDb) {
            redirect('success', res);
        } else {
            redirect('deny', res);
        }
    })
    .catch(err => {
        next(err)
    })
}

function redirect(type, res) {
    if (type === 'success') {
        res.flash.toNext(res.flash.SUCCESS, DELETE_ARTICLE_CATEGORY__SUCC_FLASH);
    } else if (type === 'deny') {
        res.flash.toNext(res.flash.WARNING, DELETE_ARTICLE_CATEGORY__ERR_MSG);
    }

    // ajax will redirect on front end
    res.send(SUCC_REDIRECT__EP);
}