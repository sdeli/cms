const config = require('config');
const articleCategsModel = require('models/article-categs-model');

const GET_EDIT_ARTICLE_CATEGORY_VIEW__EP = config.restEndpoints.admin.articleCategory.editView.replace(/(.*)(\/:[a-zA-Z]+)/, '$1'),
    UPDATE_ARTICLE_CATEGORY__SUCC_FLASH = config.flashMsgs.admin.articleCategory.update.succ;

module.exports = updateArticleCategory;
    
function updateArticleCategory(req, res) {
    let articleCategoryData = {
        currName : req.body.currArticleCategoryName,
        newName :  req.body.articleCategory
    }

    articleCategsModel.updateArticleCategoryName(articleCategoryData)
    .then(() => {
        notifAboutUpdatedCateg(res, articleCategoryData.newName);
    })
    .catch(err => {
        next(err);
    });
}

function notifAboutUpdatedCateg(res, newCategName) {
    let successMsg = UPDATE_ARTICLE_CATEGORY__SUCC_FLASH;
    res.flash.toNext(res.flash.SUCCESS, successMsg);
    
    let editArticleCategEp = `${GET_EDIT_ARTICLE_CATEGORY_VIEW__EP}/${newCategName}`;
    res.redirect(editArticleCategEp);
}