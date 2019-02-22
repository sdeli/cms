const letConfirmArticleCategoryDeletion = require('front-end-widgets/utils').alertOnClick;
const reorganizeArticlesCategoires = require('front-end-widgets/reorganize-table')

const frontEndConfig = require('front-end-config');
console.log('');
let {reorgTable, deleteArticleAlert} = frontEndConfig.bundles.articleCategoriesList;
let restEp = frontEndConfig.restEndPoints;
let {general} = frontEndConfig;

$(document).ready(() => {
    reorganizeArticlesCategoires({
        SORTABLE_TABLES__CLASS : reorgTable.tablesClass, 
        REORG_TABLE_CONTAINMENT : reorgTable.containment,
        REORG_TABLE_PLACEHOLDERS__CLASS : reorgTable.placeholdersClass,
        FALLBACK_ERR_FLASH : general.fallbackErr,
        UPDATE_TABLE_SORT__EP : restEp.admin.articleCategory.updateSort,
    });
    
    letConfirmArticleCategoryDeletion({
        alertTriggerElemClass : deleteArticleAlert.deleteArticleLinksSel, 
        alertMsg : deleteArticleAlert.deleteArticleConfirmationWarningAlert
    });
});