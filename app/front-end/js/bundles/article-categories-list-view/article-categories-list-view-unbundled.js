const config = require('front-end-config');
const letConfirmArticleCategoryDeletion = require('front-end-utils').alertOnClick;
const reorganizeArticlesCategoires = require('reorganize-table')

let {reorgTable, deleteArticleAlert} = config.bundles.articleCategoriesList;
let {general} = config;

$(document).ready(() => {
    reorganizeArticlesCategoires({
        SORTABLE_TABLES__CLASS : reorgTable.tablesClass, 
        REORG_TABLE_CONTAINMENT : reorgTable.containment,
        REORG_TABLE_PLACEHOLDERS__CLASS : reorgTable.placeholdersClass,
        FALLBACK_ERR_FLASH : general.fallbackErr,
        ADMIN_ARTICLE_UPDATE_SORT__EP : config.endPoints.updateSort,
        AJAX_CALL__CONTENT_TYPE : general.ajaxCallJsonContentType, 
        AJAX_CALL__METHOD : general.ajaxCallPostMethod
    });
    
    letConfirmArticleCategoryDeletion({
        alertTriggerElemClass : deleteArticleAlert.deleteArticleLinksSel, 
        alertMsg : deleteArticleAlert.deleteArticleConfirmationWarningAlert
    });
});