const reorganizeArticles = require('reorganize-table')
const letConfirmArticleDeletion = require('front-end-utils').alertOnClick;

$(document).ready(() => {
    reorganizeArticles({
        SORTABLE_TABLES__CLASS : process.env.ARTICLES_TABLES__CLASS, 
        REORG_TABLE_CONTAINMENT : process.env.REORG_TABLE_CONTAINMENT,
        REORG_TABLE_PLACEHOLDERS__CLASS : process.env.REORG_TABLE_PLACEHOLDERS__CLASS,
        FALLBACK_ERR_FLASH : process.env.FALLBACK_ERR_FLASH,
        ADMIN_ARTICLE_UPDATE_SORT__EP : process.env.ADMIN_ARTICLE_UPDATE_SORT__EP,
        AJAX_CALL__CONTENT_TYPE : process.env.AJAX_CALL__JSON_CONTENT_TYPE, 
        AJAX_CALL__METHOD : process.env.AJAX_CALL__POST_METHOD
    });
    
    letConfirmArticleDeletion({
        alertTriggerElemClass : process.env.DELETE_ARTICLE_LINKS__SEL, 
        alertMsg : process.env.DELETE_ARTICLE_CONFIRMATION_WARNING__ALERT
    });
});
