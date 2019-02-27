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
let editArticleCategForm = require('front-end-widgets/edit-article-category-form/');

editArticleCategForm({
    UPDATE_ARTICLE__EP : frontEndConfig.restEndPoints.admin.articleCategory.update,
    FLASH_MSGS_DIV__SEL : frontEndConfig.bundles.articleList.flashMsgsDivSel
})

},{"front-end-config":2,"front-end-widgets/edit-article-category-form/":5}],4:[function(require,module,exports){
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
let {sendPUTFormRequest} = require('front-end-widgets/utils');

module.exports = ((config) => {
    const {
        UPDATE_ARTICLE__EP,
        FLASH_MSGS_DIV__SEL
    } = config;
    
    const submitButton = $('[type="submit"]');
    const currArticleCategoryNameInput = document.querySelector(`[name="currArticleCategoryName"]`);
    const articleCategInput = document.querySelector(`[name="articleCategory"]`);

    sendPUTFormRequest = sendPUTFormRequest({
        UPDATE_ARTICLE__EP,
        FLASH_MSGS_DIV__SEL,
        CONTENT_TYPE : 'application/json'
    })
    
    editArticleCategForm()
    
    function editArticleCategForm() {
        submitButton.on('click', function(e) {
            e.preventDefault();
            
            let editArticleCategFormDataJson = getFormdataJson();
            sendPUTFormRequest(editArticleCategFormDataJson);
        });
    }

    function getFormdataJson() {
        let editArticleCategFormData = {};
        editArticleCategFormData[articleCategInput.name] = articleCategInput.value;
        editArticleCategFormData[currArticleCategoryNameInput.name] = currArticleCategoryNameInput.value;

        let editArticleCategFormDataJson = JSON.stringify(editArticleCategFormData);
        return editArticleCategFormDataJson;
    }
});
},{"front-end-widgets/utils":6}],6:[function(require,module,exports){
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
		UPDATE_ARTICLE__EP,
		FLASH_MSGS_DIV__SEL,
		CONTENT_TYPE
	} = config;

	return (formdata) => {
		$.ajax(UPDATE_ARTICLE__EP, {
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
