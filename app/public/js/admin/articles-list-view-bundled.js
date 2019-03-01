(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
module.exports=
{   
    "general" : {
        "ajaxCallJsonContentType" : "application/json",
        "ajaxCallPostMethod" : "POST",
        "fallbackErr" : "An error has occured. Please contact the site admin.",
        "windowMediumSize" : "768",
        "windowSmallSize" : "576"
    },
    "restEndPoints" : {
        "admin" : {
            "article" : {
                "image" : {
                    "upload" : "/admin/article/image",
                    "remove" : "/admin/article/image"
                },
                "update" : "/admin/article",
                "updateSort" : "/admin/articles/sort"
            },
            "articleCategory" : {
                "update" : "/admin/article-categorie",
                "updateSort" : "/admin/article-categorie/sort"
            }
        },
        "blog" : {
            "furtherUserQuestion" : "/blog/question"
        }
    },
    "bundles" : {
        "articleList" : {
            "reorgTableRowWidthClass" : "draggedRowsWidth",
            "flashMsgsDivSel" : ".flash-messages",
            "reorgTableStyleTagId" : "for-sortable-articles-table",
            "reorgTableHeadSel" : ".article-list-table__body tr:first-child",
            "articlesTablesClass" : ".article-list-table__body",
            "reorgTableContainment" : "parent",
            "reorgTablePlaceholdersClass" : "border border-success",
            "deleteArticleLinksSel" : ".article-list-table__body__row__delete-link",
            "deleteArticleConfirmationWarningAlert" : "are your sure you want to delete this article?"
        },
        "createEditArticle" : {
            "articleBodyTextAreaId" : "#article-body-editor",
            "teaserTextAreaId" : "#teaser",
            "imageDataParamName" : "imageFileInfo",
            "imageAllowedTypes" : ["jpeg", "jpg", "png"],
            "articleBodyEditorHeight" : 300,
            "squareImagePreviewElemSel" : "#square-article-image-preview",
            "squareImageBrowseBtnSel" : "#square-image-browse-btn",
            "flatImagePreviewElemSel" : "#flat-article-image-preview",
            "flatImageBrowseBtnSel" : "#flat-image-browse-btn",
            "displayedImgesHeight" : "292px"
        },
        "articleCategoriesList" : {
            "reorgTable" : {
                "tableHeadSel" : ".article-categories-list-table__body tr:first-child",
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
        },
        "registerUser" : {
            "imagePreviewElemSel" : ".user-avatar-image-preview",
            "imageBrowseBtnSel" : ".image-browse-btn-sel",
            "displayedImgesHeight" : "250px"
            
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
            "imageCouldntBeDeletedErrMsg" : "Image delete problem: ",
        }
        
    }
}
},{}],2:[function(require,module,exports){
const frontEndConfig = require('./assets/front-end-config.json');

module.exports = frontEndConfig;
},{"./assets/front-end-config.json":1}],3:[function(require,module,exports){
const frontEndConfig = require('front-end-config');
const reorganizeArticles = require('front-end-widgets/reorganize-table')
const letConfirmArticleDeletion = require('front-end-widgets/utils').alertOnClick;
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
});
},{"front-end-config":2,"front-end-widgets/reorganize-table":8,"front-end-widgets/utils":9}],4:[function(require,module,exports){
module.exports = BootstrapFlashMessage;

function BootstrapFlashMessage(type, flashMsg) {
    this.flashElem = getFlashElem(type, flashMsg);
}
    
Object.defineProperty(BootstrapFlashMessage, 'SUCCESS', {
    value: 'success',
    writable: false
});

Object.defineProperty(BootstrapFlashMessage, 'ALERT', {
    value: 'danger',
    writable: false
});

function getFlashElem(type, flashMsg) {
    let flashElemInnerHtml = ''
        + `<div class="mt-2 alert alert-${type} alert-dismissible fade show mb-2" role="alert">`
            + flashMsg
            + '<button type="button" class="close" data-dismiss="alert" aria-label="Close">'
                + '<span aria-hidden="true">&times;</span>'
            + '</button>'
        + '</div>'

    flashElem = $(flashElemInnerHtml);
    return flashElem;
}

BootstrapFlashMessage.prototype.display = function(flashMsgsDivsCssSel) {
    let flashMsgsDiv = $(flashMsgsDivsCssSel);

    flashMsgsDiv.prepend(this.flashElem);
}
},{}],5:[function(require,module,exports){
function clreaUpClassesFromDrag(ui, className) {
    let draggedItem = $(ui.item[0]);
    draggedItem.removeClass(className);
}

module.exports = clreaUpClassesFromDrag;
},{}],6:[function(require,module,exports){
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
},{}],7:[function(require,module,exports){
const Flash = require('front-end-widgets/bootstrap-flash-message');

module.exports = ((config) => {
    const {
        FALLBACK_ERR_FLASH, 
        UPDATE_TABLE_SORT__EP,
        FLASH_MSGS_DIV__SEL
    } = config;

    return updateArticlesSort;
    
    function updateArticlesSort(ui) {
        let sortedRowsArr = $(ui.target).children().toArray();
    
        let articlesSortArr = formatSortedRowsArrForServer(sortedRowsArr);
        
        $.ajax(UPDATE_TABLE_SORT__EP, {
            data : JSON.stringify(articlesSortArr),
            contentType : "application/json",
            type : "PUT"
        }).done(res => {
            displayFlashNotification(res);
        }).fail(() => {
            let flash = new Flash(Flash.ALERT, FALLBACK_ERR_FLASH)
            flash.display(FLASH_MSGS_DIV__SEL);
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
            let flash = new Flash(Flash.SUCCESS, res.msg)
            flash.display(FLASH_MSGS_DIV__SEL);
            return;
        } 
        
        let updateWasntSuccesful = typeof res.errMsg !== 'undefined' && typeof res.msg === 'undefined'; 
        if (updateWasntSuccesful) {
            let flash = new Flash(Flash.ALERT, res.errMsg)
            flash.display(FLASH_MSGS_DIV__SEL);
            return;
        } 
        
        let unexpectedErrorHappened = typeof res.errMsg === 'undefined' && typeof res.msg === 'undefined';
        if (unexpectedErrorHappened) {
            let flash = new Flash(Flash.ALERT, FALLBACK_ERR_FLASH)
            flash.display(FLASH_MSGS_DIV__SEL);
            return;
        }
    }
});
},{"front-end-widgets/bootstrap-flash-message":4}],8:[function(require,module,exports){
const preservItemWidthWhileDragged = require('./modules/preserve-item-width-while-dragged/preserve-item-width-while-dragged.js')
const clreaUpClassesFromDrag = require('./modules/clear-up-classes-from-drag/clear-up-classes-from-drag.js'); 
const updateTablesSort = require('./modules/update-tables-sort/update-tables-sort.js');

const {getUniqueStr} = require('front-end-widgets/utils');

module.exports = ((config) => {
    console.log('asd');
    const {
        SORTABLE_TABLES__CLASS, 
        REORG_TABLE_CONTAINMENT,
        REORG_TABLE_PLACEHOLDERS__CLASS,
        FALLBACK_ERR_FLASH,
        UPDATE_TABLE_SORT__EP,
        FLASH_MSGS_DIV__SEL,
        HEAD_ROW__SEL
    } = config

    updateTablessSort = updateTablesSort({
        FALLBACK_ERR_FLASH, 
        UPDATE_TABLE_SORT__EP,
        FLASH_MSGS_DIV__SEL
    });

    reorganizeTable()

    function reorganizeTable() {
        let classDefinesRowWidth = getUniqueStr(7);
        let styleTagId = getUniqueStr(7);
        let sortableTablesClass = SORTABLE_TABLES__CLASS;
        
        $(sortableTablesClass).sortable({
            containment : REORG_TABLE_CONTAINMENT,
            placeholder : REORG_TABLE_PLACEHOLDERS__CLASS,
            cancel : HEAD_ROW__SEL,
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
},{"./modules/clear-up-classes-from-drag/clear-up-classes-from-drag.js":5,"./modules/preserve-item-width-while-dragged/preserve-item-width-while-dragged.js":6,"./modules/update-tables-sort/update-tables-sort.js":7,"front-end-widgets/utils":9}],9:[function(require,module,exports){
const frontEndConfig = require('front-end-config');
const FlashMessage = require('front-end-widgets/bootstrap-flash-message');

const FALLBACK_ERR_FLASH = frontEndConfig.general.fallbackErr;

function getUniqueStr(randStrLength) {
	var randStr = "";
	var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
 
	for (var i = 0; i < randStrLength; i++)
	  randStr += possible.charAt(Math.floor(Math.random() * possible.length));
 
	return randStr;
}

function alertOnClick(config, cb) {
	const {alertMsg} = config;

	return (e) => {
		e.preventDefault();
	
		if(confirm(alertMsg)) {
			cb(e)
		}
	}
}

function sendDeleteRequestOnEvent(config) {
	const {FLASH_MSGS_DIV__SEL} = config;

	return (e) => {
		e.preventDefault(); 
	
		let deleteEp = e.target.getAttribute('data-href');
	
		$.ajax(deleteEp, {
			type : "DELETE"
		})
		.done(redirectEp => {
			window.location.replace(redirectEp);
		})
		.fail(() => {
			let flash = new FlashMessage(FlashMessage.ALERT, FALLBACK_ERR_FLASH)
			flash.display(FLASH_MSGS_DIV__SEL);
		});
	}
}

function sendPUTFormRequest(config) {
	const {
		UPDATE__EP,
		FLASH_MSGS_DIV__SEL,
		CONTENT_TYPE
	} = config;

	return (formdata) => {
		$.ajax(UPDATE__EP, {
			type : "PUT",
			data: formdata,
			contentType: CONTENT_TYPE || false,
			processData: false,
		})
		.done(redirectEp => {
			window.location.replace(redirectEp);
		})
		.fail(() => {
			let flash = new FlashMessage(FlashMessage.ALERT, FALLBACK_ERR_FLASH)
			flash.display(FLASH_MSGS_DIV__SEL);
		});
	}
}

module.exports = {
	getUniqueStr,
	alertOnClick,
	sendDeleteRequestOnEvent,
	sendPUTFormRequest
};
},{"front-end-config":2,"front-end-widgets/bootstrap-flash-message":4}]},{},[3]);
