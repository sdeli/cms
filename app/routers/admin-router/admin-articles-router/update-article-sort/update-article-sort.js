const config = require('config');
const articlesModel = require('models/articles-model');

const UPDATE_ARTICLE_SORT__SUCC_FLASH = config.flashMsgs.admin.article.updateSort.succ,
  UPDATE_ARTICLE_SORT__ERR_FLASH = config.flashMsgs.admin.article.updateSort.err;

module.exports = updateArticleSort;
    
function updateArticleSort(req, res) {
    let articlesNewSortArr = req.body;

    articlesModel.updateArticlesSort(articlesNewSortArr)
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