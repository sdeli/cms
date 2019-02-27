const frontEndConfig = require('front-end-config');
const reorganizeArticles = require('front-end-widgets/reorganize-table')
const letConfirmArticleDeletion = require('front-end-widgets/utils').alertOnClick;
const blogNavbar = require('front-end-widgets/blog-navbar');
let {sendDeleteRequestOnEvent} = require('front-end-widgets/utils');

const FLASH_MSGS_DIV__SEL = frontEndConfig.bundles.articleList.flashMsgsDivSel;

$(document).ready(() => {
    reorganizeArticles({
        SORTABLE_TABLES__CLASS : frontEndConfig.bundles.articleList.articlesTablesClass, 
        REORG_TABLE_CONTAINMENT : frontEndConfig.bundles.articleList.reorgTableContainment,
        REORG_TABLE_PLACEHOLDERS__CLASS : frontEndConfig.bundles.articleList.reorgTablePlaceholdersClass,
        FALLBACK_ERR_FLASH : frontEndConfig.general.fallbackErr,
        UPDATE_TABLE_SORT__EP : frontEndConfig.restEndPoints.admin.article.updateSort,
        FLASH_MSGS_DIV__SEL,
        HEAD_ROW__SEL : frontEndConfig.bundles.articleList.reorgTableHeadSel
    });

    sendDeleteRequestOnEvent = sendDeleteRequestOnEvent({
        FLASH_MSGS_DIV__SEL
    });
    
    window.deleteArticle = letConfirmArticleDeletion({
        alertTriggerElemClass : frontEndConfig.bundles.articleList.deleteArticleLinksSel, 
        alertMsg : frontEndConfig.bundles.articleList.deleteArticleConfirmationWarningAlert
    }, sendDeleteRequestOnEvent);

    blogNavbar();
});