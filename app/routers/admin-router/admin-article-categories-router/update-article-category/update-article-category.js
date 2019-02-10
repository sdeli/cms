const config = require('config');
const articleCategsModel = require('models/article-categs-model');

const EDIT_ARTICLE_CATEGORY_VIEW__PATH = config.viewPathes.admin.articleCategory.createEdit,
    EDIT_ARTICLE_CATEGORY_VIEW__ID = config.templateConf.admin.articleCategory.edit.id,
    EDIT_ARTICLE_CATEGORY_VIEW__TITLE = config.templateConf.admin.articleCategory.edit.title,
    UPDATE_ARTICLE_CATEGORY__EP = config.restEndpoints.admin.articleCategory.update,
    UPDATE_ARTICLE_CATEGORY__SUCC_FLASH = config.flashMsgs.admin.articleCategory.update.succ,
    UPDATE_ARTICLE_CATEGORY__ERR_FLASH = config.flashMsgs.admin.articleCategory.update.err,
    WARNING_EVENT = config.errHandling.errEvents.warningWithReq;

module.exports = updateArticleCategory;
    
function updateArticleCategory(req, res) {
    let articleCategoryData = {
        currName : req.body.currArticleCategoryName,
        newName :  req.body.articleCategory
    }

    articleCategsModel.updateArticleCategoryName(articleCategoryData)
    .then(() => {
        renderEditArticleView('success', res, articleCategoryData.newName);
    })
    .catch(e => {
        process.emit(WARNING_EVENT, e.stack, req);
        renderEditArticleView('deny', res, articleCategoryData.currName);
    });
}

function renderEditArticleView(type, res, currArticleCategoryName) {
    if (type === 'success') {
        res.flash.toCurr(res.flash.SUCCESS, UPDATE_ARTICLE_CATEGORY__SUCC_FLASH);
    } else if ('deny') {
        res.flash.toCurr(res.flash.WARNING, UPDATE_ARTICLE_CATEGORY__ERR_FLASH);
    }

    res.render(EDIT_ARTICLE_CATEGORY_VIEW__PATH, {
        pageTitle : `${EDIT_ARTICLE_CATEGORY_VIEW__TITLE} ${currArticleCategoryName}`,
        pageId : EDIT_ARTICLE_CATEGORY_VIEW__ID,
        postDataToRoute : UPDATE_ARTICLE_CATEGORY__EP,
        articleCategoryName : currArticleCategoryName
    });
} 