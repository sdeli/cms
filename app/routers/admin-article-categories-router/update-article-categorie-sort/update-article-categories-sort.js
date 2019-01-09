const articleCategsModel = require('article-categs-model').getInst();

module.exports = ((config) => {
    const {
        UPDATE_ARTICLE_CATEGORIES_SORT__SUCC_FLASH,
        UPDATE_ARTICLE_CATEGORIES_SORT__ERR_FLASH
    } = config;

    return updateArticleCategoriesSort;
    
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
});