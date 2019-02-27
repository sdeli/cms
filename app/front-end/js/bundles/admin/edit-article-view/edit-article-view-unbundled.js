const frontEndConfig = require('front-end-config');
const setUpFroalaEditor = require('./moduls/set-up-froala-editor/set-up-froala-editor.js');
const displayBrowsedImage = require('front-end-widgets/display-browsed-image');
let editArticleForm = require('front-end-widgets/edit-article-from');

$(document).ready(() => {
    editArticleForm({
        UPDATE_ARTICLE__EP : frontEndConfig.restEndPoints.admin.article.update,
        FALLBACK_ERR_FLASH : frontEndConfig.general.fallbackErr,
        FLASH_MSGS_DIV__SEL : frontEndConfig.bundles.articleList.flashMsgsDivSel
    });

    setUpFroalaEditor({
        ARTICLE_BODY_EDITOR_TEXT_AREA_ID : frontEndConfig.bundles.createEditArticle.articleBodyTextAreaId,
        IMAGE_UPLOAD_EP : frontEndConfig.restEndPoints.admin.article.image.upload,
        FROALA_IMAGE_REMOVED__EVENT : frontEndConfig.froala.events.image.removed,
        REMOVE_IMAGE__EP : frontEndConfig.restEndPoints.admin.article.image.remove,
        IMAGE_DELETED__MSG : frontEndConfig.froala.general.imgRemovedMsg,
        IMAGE_COULDNT_BE_DELETED__ERR_MSG : frontEndConfig.froala.general.imageCouldntBeDeletedErrMsg,
    });

    displayBrowsedImage({
        IMAGE_PREVIEW_ELEM__SEL : frontEndConfig.bundles.createEditArticle.squareImagePreviewElemSel,
        BROWSE_BTN__SEL : frontEndConfig.bundles.createEditArticle.squareImageBrowseBtnSel,
        DISPLAYED_IMG__HEIGHT : frontEndConfig.bundles.createEditArticle.displayedImgesHeight
    });

    displayBrowsedImage({
        IMAGE_PREVIEW_ELEM__SEL : frontEndConfig.bundles.createEditArticle.flatImagePreviewElemSel,
        BROWSE_BTN__SEL : frontEndConfig.bundles.createEditArticle.flatImageBrowseBtnSel,
        DISPLAYED_IMG__HEIGHT : frontEndConfig.bundles.createEditArticle.displayedImgesHeight
    });
});