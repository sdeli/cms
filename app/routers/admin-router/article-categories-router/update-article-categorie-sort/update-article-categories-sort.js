const config = require('config');
const articleCategsModel = require('models/article-categs-model');

const UPDATE_ARTICLE_CATEGORIES_SORT__SUCC_FLASH = config.flashMsgs.admin.articleCategory.updateSort.succ;

module.exports = updateArticleCategoriesSort;
    
function updateArticleCategoriesSort(req, res, next) {
    let articlesNewSortArr = req.body;

    articleCategsModel.updateArticlesCategoriesSort(articlesNewSortArr)
    .then(() => {
        res.json({
            msg : UPDATE_ARTICLE_CATEGORIES_SORT__SUCC_FLASH
        });
    })
    .catch(err => {
        next(err);
    });
}