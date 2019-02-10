const config = require('config');
const articleCategsModel = require('models/article-categs-model');

const  ARTICLE_CATEGORY_NOT_FOUND_IN_DB__ERR_MSG = config.errorMsgs.general.articleCategoryNotFoundInDb, 
    UNEXPECTED_ERR_EVENT__ERR_FLASH = config.errorMsgs.general.fallbackErr,
    EDIT_ARTICLE_CATEGORY_VIEW__PATH = config.viewPathes.admin.articleCategory.createEdit,
    EDIT_ARTICLE_CATEGORY_VIEW__TITLE = config.templateConf.admin.articleCategory.edit.title, 
    EDIT_ARTICLE_CATEGORY_VIEW__ID = config.templateConf.admin.articleCategory.edit.id, 
    UPDATE_ARTICLE_CATEGORY__EP = config.restEndpoints.admin.articleCategory.update,
    FAILURE_REDIRECT__EP = config.restEndpoints.admin.articleCategory.listView,
    WARNING_EVENT = config.errHandling.errEvents.warningWithReq

module.exports = getEditArticleCategoryView;

function getEditArticleCategoryView(req, res) {
    let {articleCategoryName} = req.params;

    articleCategsModel.checkIfArticleCategExists(articleCategoryName)
    .then((doesArticleCategExists) => {
        if (doesArticleCategExists) {
            renderEditArticleView(res, articleCategoryName)
        } else {
            denyEditArticle(res)
            throw new Error(ARTICLE_CATEGORY_NOT_FOUND_IN_DB__ERR_MSG);
        }
    })
    .catch(e => {
        denyEditArticle(res)
        process.emit(WARNING_EVENT, e.stack, req);
    });
}

function renderEditArticleView(res, articleCategoryName) {
    res.render(EDIT_ARTICLE_CATEGORY_VIEW__PATH, {
        pageTitle : `${EDIT_ARTICLE_CATEGORY_VIEW__TITLE} ${articleCategoryName}`,
        pageId : EDIT_ARTICLE_CATEGORY_VIEW__ID,
        postDataToRoute : UPDATE_ARTICLE_CATEGORY__EP,
        articleCategoryName
    });
}

function denyEditArticle(res) {
    res.flash.toNext(res.flash.WARNING, UNEXPECTED_ERR_EVENT__ERR_FLASH);
    res.redirect(FAILURE_REDIRECT__EP);
}