const adminModel = require('admin-model').getInst();
const env = process.env;

module.exports = ((config) => {
    const {UPDATE_ARTICLE_SORT__SUCC_FLASH, UPDATE_ARTICLE_SORT__ERR_FLASH} = config;

    return updateArticleSort;
    
    function updateArticleSort(req, res) {
        let articlesNewSortArr = req.body;
    
        adminModel.updateArticlesSort(articlesNewSortArr)
        .then(() => {
            res.json({
                msg : UPDATE_ARTICLE_SORT__SUCC_FLASH
            });
        })
        .catch(e => {
            let errMsg = UPDATE_ARTICLE_SORT__ERR_FLASH;
    
            res.json({
                errMsg
            });
        });
    }
});