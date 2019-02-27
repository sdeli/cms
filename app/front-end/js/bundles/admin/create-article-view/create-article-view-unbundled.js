const frontEndconfig = require('front-end-config');
const setUpFroalaEditor = require('./moduls/set-up-froala-editor/set-up-froala-editor.js');
const displayBrowsedImage = require('front-end-widgets/display-browsed-image');

$(document).ready(() => {
    setUpFroalaEditor({
        ARTICLE_BODY_EDITOR_TEXT_AREA_ID : frontEndconfig.bundles.createEditArticle.articleBodyTextAreaId,
        IMAGE_UPLOAD_EP : frontEndconfig.restEndPoints.admin.article.image.upload,
        FROALA_IMAGE_REMOVED__EVENT : frontEndconfig.froala.events.image.removed,
        REMOVE_IMAGE__EP : frontEndconfig.restEndPoints.admin.article.image.remove,
        IMAGE_DELETED__MSG : frontEndconfig.froala.general.imgRemovedMsg,
        IMAGE_COULDNT_BE_DELETED__ERR_MSG : frontEndconfig.froala.general.imageCouldntBeDeletedErrMsg,
    });

    displayBrowsedImage({
        IMAGE_PREVIEW_ELEM__SEL : frontEndconfig.bundles.createEditArticle.squareImagePreviewElemSel,
        BROWSE_BTN__SEL : frontEndconfig.bundles.createEditArticle.squareImageBrowseBtnSel,
        DISPLAYED_IMG__HEIGHT : frontEndconfig.bundles.createEditArticle.displayedImgesHeight
    });

    displayBrowsedImage({
        IMAGE_PREVIEW_ELEM__SEL : frontEndconfig.bundles.createEditArticle.flatImagePreviewElemSel,
        BROWSE_BTN__SEL : frontEndconfig.bundles.createEditArticle.flatImageBrowseBtnSel,
        DISPLAYED_IMG__HEIGHT : frontEndconfig.bundles.createEditArticle.displayedImgesHeight
    });
});