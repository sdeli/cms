(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
module.exports=
{   
    "general" : {
        "ajaxCallJsonContentType" : "application/json",
        "ajaxCallPostMethod" : "POST",
        "fallbackErr" : "An error has occured. Please contact the site admin."
    },
    "endPoints" : {
        "uploadArticleImage" : "/admin/article-image/upload",
        "removeArticleImage" : "/admin/article-image/remove",
        "updateSort" : "/admin/article-category/update-sort"
    },
    "bundles" : {
        "articleList" : {
            "reorgTableRowWidthClass" : "draggedRowsWidth",
            "reorgTableStyleTagId" : "for-sortable-articles-table",
            "articlesTablesClass" : ".article-list-table__body",
            "reorgTableContainment" : "parent",
            "reorgTablePlaceholdersClass" : "border border-success",
            "deleteArticleLinksSel" : ".article-list-table__body__row__delete-link",
            "deleteArticleConfirmationWarningAlert" : "are your sure you want to delete this article?"
        },
        "createEditArticle" : {
            "articleBodyTextAreaId" : "#article-body-editor",
            "imageDataParamName" : "imageFileInfo",
            "imageAllowedTypes" : ["jpeg", "jpg", "png"],
            "articleBodyEditorHeight" : 300,
            "imagePreviewElemSel" : ".article-image-preview",
            "imageBrowseBtnSel" : ".image-browse-btn-sel",
            "displayedImgaesHeight" : "292px"
        },
        "articleCategoriesList" : {
            "reorgTable" : {
                "rowWidthClass" : "draggedRowsWidth",
                "styleTagId" : "for-sortable-articles-categories-table",
                "tablesClass" : ".article-categories-list-table__body",
                "containment" : "parent",
                "placeholdersClass" : "border border-success"
            },
            "deleteArticleAlert" : {
                "deleteArticleLinksSel" : ".article-categories-list-table__body__row__delete-link",
                "deleteArticleConfirmationWarningAlert" : "are your sure you want to delete this article cateogire?"    
            }
        } 
    },
    "froala" : {
        "events" : {
            "image" : {
                "uploaded" : "froalaEditor.image.uploaded",
                "inserted" : "froalaEditor.image.inserted",
                "replaced" : "froalaEditor.image.replaced",
                "removed" : "froalaEditor.image.removed",
                "error" : "froalaEditor.image.error"
            }
        },
        "general" : {
            "imgRemovedMsg" : "Image was deleted",
            "imageCouldntBeDeletedErrMsg" : "Image delete problem: "
        }
        
    }
}
},{}],2:[function(require,module,exports){
const config = require('./assets/front-end-config.json');

module.exports = config;
},{"./assets/front-end-config.json":1}],3:[function(require,module,exports){
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
},{"front-end-config":2,"front-end-utils":4,"reorganize-table":5}],4:[function(require,module,exports){
function getUniqueStr(randStrLength) {
	var randStr = "";
	var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
 
	for (var i = 0; i < randStrLength; i++)
	  randStr += possible.charAt(Math.floor(Math.random() * possible.length));
 
	return randStr;
}

function alertOnClick(config) {
	const {alertTriggerElemClass, alertMsg} = config;

    $(alertTriggerElemClass).on('click', function(e) {
        if(!confirm(alertMsg)) {
            e.preventDefault();
        }
    })
}

module.exports = {
	setUpFroalaEditor,
	getUniqueStr,
	alertOnClick
};
},{}],5:[function(require,module,exports){
const preservItemWidthWhileDragged = require('./modules/preserve-item-width-while-dragged/preserve-item-width-while-dragged.js')
const clreaUpClassesFromDrag = require('./modules/clear-up-classes-from-drag/clear-up-classes-from-drag.js'); 
const updateTablesSort = require('./modules/update-tables-sort/update-tables-sort.js');

const {getUniqueStr} = require('front-end-utils');

module.exports = ((config) => {
    const {
        SORTABLE_TABLES__CLASS, 
        REORG_TABLE_CONTAINMENT,
        REORG_TABLE_PLACEHOLDERS__CLASS,
        FALLBACK_ERR_FLASH,
        ADMIN_ARTICLE_UPDATE_SORT__EP,
        AJAX_CALL__CONTENT_TYPE, 
        AJAX_CALL__METHOD
    } = config

    updateTablessSort = updateTablesSort({
        FALLBACK_ERR_FLASH, 
        UPDATE_ARTICLES_SORTING_ROUTE : ADMIN_ARTICLE_UPDATE_SORT__EP,
        AJAX_CALL__CONTENT_TYPE, 
        AJAX_CALL__METHOD
    });

    reorganizeTable()

    function reorganizeTable() {
        let classDefinesRowWidth = getUniqueStr(7);
        let styleTagId = getUniqueStr(7);
        let sortableTablesClass = SORTABLE_TABLES__CLASS;
        
        $(sortableTablesClass).sortable({
            containment : REORG_TABLE_CONTAINMENT,
            placeholder : REORG_TABLE_PLACEHOLDERS__CLASS,
            start : (e, ui) => {
                preservItemWidthWhileDragged(ui, classDefinesRowWidth, styleTagId);
            },
            stop: (e, ui) => {
                clreaUpClassesFromDrag(ui, classDefinesRowWidth);
            },
            update: (ui) => {
                updateTablessSort(ui);
            }
        });
    
        $(sortableTablesClass).disableSelection();
    }
});
},{"./modules/clear-up-classes-from-drag/clear-up-classes-from-drag.js":6,"./modules/preserve-item-width-while-dragged/preserve-item-width-while-dragged.js":7,"./modules/update-tables-sort/update-tables-sort.js":8,"front-end-utils":4}],6:[function(require,module,exports){
function clreaUpClassesFromDrag(ui, className) {
    let draggedItem = $(ui.item[0]);
    draggedItem.removeClass(className);
}

module.exports = clreaUpClassesFromDrag;
},{}],7:[function(require,module,exports){
module.exports = (() => {
    let className, styleTagId;

    function preservItemWidthWhileDragged(ui, $className, $styleTagId) {
        className = $className;
        styleTagId = $styleTagId;

        let draggedRow = $(ui.item[0]);
        let classDefinesWidth = getCssClassForWidth(draggedRow);
        draggedRow.addClass(classDefinesWidth);
    }
    
    function getCssClassForWidth(draggedRow) {
        let styleTagForSortArticles = $(`style#${styleTagId}`);
        let hasStyleTagForSort = styleTagForSortArticles.length > 0;
        let cssClassBody = getPreserveWidthCssClassBody(draggedRow);
    
        if (!hasStyleTagForSort) {
            $('head').append(`<style id=\'${styleTagId}\'></style>`);
            let styleTag = $(`style#${styleTagId}`);
            styleTag.append(cssClassBody);
        } else {
            styleTagForSortArticles.innerHTML = '';
            styleTagForSortArticles.html(cssClassBody);
        }
        
        return className;
    }
    
    function getPreserveWidthCssClassBody(draggedRow) {
        let cellsInDraggedRow = draggedRow.children();
        let diffRowWithRepresentativeWidth = draggedRow.parent().children().not(`[id=${draggedRow.attr('id')}]`).eq(0);
        let representativeCells = diffRowWithRepresentativeWidth.children();
        let withForDraggedRow = diffRowWithRepresentativeWidth.css('width');
        
        let cssClassBody = `.${className} {width: ${withForDraggedRow};} `;
    
        cellsInDraggedRow.each((i) => {
            widthForDraggedRowsCurrCell = representativeCells.eq(i).css('width');
            cssClassBody += `.${className} > td:nth-child(${i + 1}) {`
            + `width: ${widthForDraggedRowsCurrCell};`
            + `} `;
        });
    
        return cssClassBody;
    }

    return preservItemWidthWhileDragged;
})();
},{}],8:[function(require,module,exports){
const Flash = require('flash-on-client');
const flash = new Flash('.falsh-messages');

module.exports = ((config) => {
    console.log('conf');
    const {FALLBACK_ERR_FLASH, UPDATE_ARTICLES_SORTING_ROUTE, AJAX_CALL__CONTENT_TYPE, AJAX_CALL__METHOD} = config;

    return updateArticlesSort;
    
    function updateArticlesSort(ui) {
        let sortedRowsArr = $(ui.target).children().toArray();
    
        let articlesSortArr = formatSortedRowsArrForServer(sortedRowsArr);
        
        $.ajax(UPDATE_ARTICLES_SORTING_ROUTE, {
            data : JSON.stringify(articlesSortArr),
            contentType : AJAX_CALL__CONTENT_TYPE,
            type : AJAX_CALL__METHOD
        }).done(res => {
            displayFlashNotification(res);
        }).fail(error => {
            flash.display(flash.WARNING , FALLBACK_ERR_FLASH);
            return;
        });
    }

    function formatSortedRowsArrForServer(sortedRowsArr) {
        let articlesSortArr = sortedRowsArr.reduce((accumulator, currArticle, i) => {
            let currArticleSort = {
                id : currArticle.getAttribute('id'),
                sort : sortedRowsArr.length - i
            }
    
            return [...accumulator, currArticleSort];
        }, []);

        return articlesSortArr;
    }

    function displayFlashNotification(res) {
        let updateWasSuccesful = typeof res.errMsg === 'undefined' && typeof res.msg !== 'undefined'; 
        if (updateWasSuccesful) {
            flash.display(flash.SUCCESS, res.msg);
            return;
        } 
        
        let updateWasntSuccesful = typeof res.errMsg !== 'undefined' && typeof res.msg === 'undefined'; 
        if (updateWasntSuccesful) {
            flash.display(flash.WARNING, res.errMsg);
            return;
        } 
        
        let unexpectedErrorHappened = typeof res.errMsg === 'undefined' && typeof res.msg === 'undefined';
        if (unexpectedErrorHappened) {
            flash.display(flash.WARNING , FALLBACK_ERR_FLASH);
            return;
        }
    }
});
},{"flash-on-client":10}],9:[function(require,module,exports){
module.exports={
    "success" : "success",
    "info" : "info",
    "warning" : "danger"
}
},{}],10:[function(require,module,exports){
const flashConfig = require('./config.json');
const displayMessage = require('./moduls/display-message/display-message.js');

module.exports = (() => {
    class Flash {
        constructor (flasMsgsDivsCssSel) {
            this.display = displayMessage(flasMsgsDivsCssSel);
        }
        
        get SUCCESS() {
            return flashConfig.success;
        }

        get INFO() {
            return flashConfig.info;
        }

        get WARNING() {
            return flashConfig.warning;
        }
    }

    return Flash;
})();
},{"./config.json":9,"./moduls/display-message/display-message.js":11}],11:[function(require,module,exports){
module.exports = (() => {
    let flasMsgsDivsCssSel;

    return init;

    function init($flasMsgsDivsCssSel) {
        flasMsgsDivsCssSel = $flasMsgsDivsCssSel;

        return displayMessage;
    }

    function displayMessage(type, flasMsg) {
        let flasMsgsDiv = $(flasMsgsDivsCssSel);
        let messagesInnerHtml = getMessagesInnerHtml(type, flasMsg);
    
        flasMsgsDiv.append(messagesInnerHtml);
    }
    
    function getMessagesInnerHtml(type, flasMsg) {
        let msgHtml = ''
            +  `<div class="alert alert-${type} alert-dismissible fade show" role="alert">`
                +   flasMsg
                +   '<button type="button" class="close" data-dismiss="alert" aria-label="Close">'
                    +   '<span aria-hidden="true">&times;</span>'
                +   '</button>'
            +   `</div>`
        
        return msgHtml;
    }
})();
},{}]},{},[3]);
