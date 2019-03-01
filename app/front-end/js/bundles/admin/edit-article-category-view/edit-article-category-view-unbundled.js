const frontEndConfig = require('front-end-config');
let editArticleCategForm = require('front-end-widgets/edit-article-category-form/');

editArticleCategForm({
    UPDATE_ARTICLE_CATED__EP : frontEndConfig.restEndPoints.admin.articleCategory.update,
    FLASH_MSGS_DIV__SEL : frontEndConfig.bundles.articleList.flashMsgsDivSel
})
