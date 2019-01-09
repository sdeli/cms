const config = require('front-end-config');
const setUpFroalaEditor = require('./moduls/set-up-froala-editor/set-up-froala-editor.js');
const displayBrowsedImage = require('display-browsed-image');

$(document).ready(() => {
    setUpFroalaEditor({
        ARTICLE_BODY_EDITOR_TEXT_AREA_ID : config.bundles.createEditArticle.articleBodyTextAreaId,
        IMAGE_UPLOAD_EP : config.endPoints.uploadArticleImage,
        AJAX_POST_METHOD__TERM : config.general.ajaxCallPostMethod,
        FROALA_IMAGE_REMOVED__EVENT : config.froala.events.image.removed,
        REMOVE_IMAGE__EP : config.endPoints.removeArticleImage,
        IMAGE_DELETED__MSG : config.froala.general.imgRemovedMsg,
        IMAGE_COULDNT_BE_DELETED__ERR_MSG : config.froala.general.imageCouldntBeDeletedErrMsg,
    });

    displayBrowsedImage({
        IMAGE_PREVIEW_ELEM__SEL : config.bundles.createEditArticle.imagePreviewElemSel,
        BROWSE_BTN__SEL : config.bundles.createEditArticle.imageBrowseBtnSel,
        DISPLAYED_IMG__HEIGHT : config.bundles.createEditArticle.displayedImgaesHeight
    });
});