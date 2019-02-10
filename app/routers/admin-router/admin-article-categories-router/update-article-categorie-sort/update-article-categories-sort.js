const config = require('config');
const articleCategsModel = require('models/article-categs-model');

const UPDATE_ARTICLE_CATEGORIES_SORT__SUCC_FLASH = config.flashMsgs.admin.articleCategory.updateSort.succ,
    UPDATE_ARTICLE_CATEGORIES_SORT__ERR_FLASH = config.flashMsgs.admin.articleCategory.updateSort.err;

module.exports = updateArticleCategoriesSort;
    
function updateArticleCategoriesSort(req, res) {
    let articlesNewSortArr = req.body;

    articleCategsModel.updateArticlesCategoriesSort(articlesNewSortArr)
    .then(() => {
        res.json({
            msg : UPDATE_ARTICLE_CATEGORIES_SORT__SUCC_FLASH
        });
    })
    .catch(e => {
        let errMsg = UPDATE_ARTICLE_CATEGORIES_SORT__ERR_FLASH;

        res.json({
            errMsg
        });
    });
}