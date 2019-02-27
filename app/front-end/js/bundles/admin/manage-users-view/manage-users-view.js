const frontEndConfig = require('front-end-config');
const blockUi = require('front-end-widgets/block-ui');
const FlashMessage = require('front-end-widgets/flash-message');
const letConfirmArticleCategoryDeletion = require('front-end-widgets/utils').alertOnClick;
let {sendDeleteRequestOnEvent} = require('front-end-widgets/utils');

const {deleteArticleAlert} = frontEndConfig.bundles.articleCategoriesList;

$(document).ready(() => {
    blockUi.init();
    FlashMessage.activateCloseBtns();

    sendDeleteRequestOnEvent = sendDeleteRequestOnEvent({
        FLASH_MSGS_DIV__SEL : frontEndConfig.bundles.articleList.flashMsgsDivSel
    });

    window.deleteUser = letConfirmArticleCategoryDeletion({
        alertTriggerElemClass : deleteArticleAlert.deleteArticleLinksSel, 
        alertMsg : deleteArticleAlert.deleteArticleConfirmationWarningAlert
    }, sendDeleteRequestOnEvent);
});