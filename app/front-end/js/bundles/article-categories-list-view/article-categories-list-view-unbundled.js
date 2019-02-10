const frontEndConfig = require('front-end-config');
const config = require('config');
const letConfirmArticleCategoryDeletion = require('front-end-widgets/utils').alertOnClick;
const reorganizeArticlesCategoires = require('front-end-widgets/reorganize-table')

let {reorgTable, deleteArticleAlert} = frontEndConfig.bundles.articleCategoriesList;
let restEp = config.restEndpoints;
let {general} = frontEndConfig;

$(document).ready(() => {
    reorganizeArticlesCategoires({
        SORTABLE_TABLES__CLASS : reorgTable.tablesClass, 
        REORG_TABLE_CONTAINMENT : reorgTable.containment,
        REORG_TABLE_PLACEHOLDERS__CLASS : reorgTable.placeholdersClass,
        FALLBACK_ERR_FLASH : general.fallbackErr,
        UPDATE_TABLE_SORT__EP : restEp.admin.articleCategory.updateSort,
        AJAX_CALL__CONTENT_TYPE : general.ajaxCallJsonContentType, 
        AJAX_CALL__METHOD : general.ajaxCallPostMethod
    });
    
    letConfirmArticleCategoryDeletion({
        alertTriggerElemClass : deleteArticleAlert.deleteArticleLinksSel, 
        alertMsg : deleteArticleAlert.deleteArticleConfirmationWarningAlert
    });
});