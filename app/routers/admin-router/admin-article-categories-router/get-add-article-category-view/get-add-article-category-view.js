const config = require('config');

const CREATE_ARTICLE_CATEGORY_VIEW__PATH = config.viewPathes.admin.articleCategory.createEdit, 
    CREATE_ARTICLE_CATEGORY_VIEW__TITLE = config.templateConf.admin.articleCategory.create.title, 
    CREATE_ARTICLE_VIEW__ID = config.templateConf.admin.articleCategory.create.id, 
    CREATE_ARTICLE_CATEGORY__EP = config.restEndpoints.admin.articleCategory.create

module.exports = getAddArticleCategoryView;
    
function getAddArticleCategoryView(req, res) {
    let isRequestFormPrevValidationErr = Boolean(Object.keys(req.body).length)

    res.render(CREATE_ARTICLE_CATEGORY_VIEW__PATH, {
        pageTitle : CREATE_ARTICLE_CATEGORY_VIEW__TITLE,
        pageId : CREATE_ARTICLE_VIEW__ID,
        postDataToRoute : CREATE_ARTICLE_CATEGORY__EP,
        articleCategoryName : isRequestFormPrevValidationErr ? req.body.articleCategory : false
    });
}