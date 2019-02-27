const frontEndConfig = require('front-end-config');
const letConfirmArticleCategoryDeletion = require('front-end-widgets/utils').alertOnClick;
let {sendDeleteRequestOnEvent} = require('front-end-widgets/utils');
const reorganizeArticlesCategoires = require('front-end-widgets/reorganize-table');

let {reorgTable, deleteArticleAlert} = frontEndConfig.bundles.articleCategoriesList;
let restEp = frontEndConfig.restEndPoints;
let {general} = frontEndConfig;

const FLASH_MSGS_DIV__SEL = frontEndConfig.bundles.articleList.flashMsgsDivSel;

$(document).ready(() => {
    reorganizeArticlesCategoires({
        SORTABLE_TABLES__CLASS : reorgTable.tablesClass, 
        REORG_TABLE_CONTAINMENT : reorgTable.containment,
        REORG_TABLE_PLACEHOLDERS__CLASS : reorgTable.placeholdersClass,
        FALLBACK_ERR_FLASH : general.fallbackErr,
        UPDATE_TABLE_SORT__EP : restEp.admin.articleCategory.updateSort,
        FLASH_MSGS_DIV__SEL,
        HEAD_ROW__SEL : frontEndConfig.bundles.articleCategoriesList.reorgTable.tableHeadSel
    });

    sendDeleteRequestOnEvent = sendDeleteRequestOnEvent({
        FLASH_MSGS_DIV__SEL
    });
    
    window.deleteArticleCateg = letConfirmArticleCategoryDeletion({
        alertTriggerElemClass : deleteArticleAlert.deleteArticleLinksSel, 
        alertMsg : deleteArticleAlert.deleteArticleConfirmationWarningAlert
    }, sendDeleteRequestOnEvent);
});