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
const setUpFroalaEditor = require('./moduls/set-up-froala-editor/set-up-froala-editor.js');
const displayBrowsedImage = require('front-end-widgets/display-browsed-image');
let editArticleForm = require('front-end-widgets/edit-article-from');

$(document).ready(() => {
    editArticleForm({
        UPDATE_ARTICLE__EP : frontEndConfig.restEndPoints.admin.article.update,
        FALLBACK_ERR_FLASH : frontEndConfig.general.fallbackErr,
        FLASH_MSGS_DIV__SEL : frontEndConfig.bundles.articleList.flashMsgsDivSel
    });

    setUpFroalaEditor({
        ARTICLE_BODY_EDITOR_TEXT_AREA_ID : frontEndConfig.bundles.createEditArticle.articleBodyTextAreaId,
        IMAGE_UPLOAD_EP : frontEndConfig.restEndPoints.admin.article.image.upload,
        FROALA_IMAGE_REMOVED__EVENT : frontEndConfig.froala.events.image.removed,
        REMOVE_IMAGE__EP : frontEndConfig.restEndPoints.admin.article.image.remove,
        IMAGE_DELETED__MSG : frontEndConfig.froala.general.imgRemovedMsg,
        IMAGE_COULDNT_BE_DELETED__ERR_MSG : frontEndConfig.froala.general.imageCouldntBeDeletedErrMsg,
    });

    displayBrowsedImage({
        IMAGE_PREVIEW_ELEM__SEL : frontEndConfig.bundles.createEditArticle.squareImagePreviewElemSel,
        BROWSE_BTN__SEL : frontEndConfig.bundles.createEditArticle.squareImageBrowseBtnSel,
        DISPLAYED_IMG__HEIGHT : frontEndConfig.bundles.createEditArticle.displayedImgesHeight
    });

    displayBrowsedImage({
        IMAGE_PREVIEW_ELEM__SEL : frontEndConfig.bundles.createEditArticle.flatImagePreviewElemSel,
        BROWSE_BTN__SEL : frontEndConfig.bundles.createEditArticle.flatImageBrowseBtnSel,
        DISPLAYED_IMG__HEIGHT : frontEndConfig.bundles.createEditArticle.displayedImgesHeight
    });
});
},{"./moduls/set-up-froala-editor/set-up-froala-editor.js":4,"front-end-config":2,"front-end-widgets/display-browsed-image":6,"front-end-widgets/edit-article-from":7}],4:[function(require,module,exports){
module.exports = ((config) => {
    const {
        ARTICLE_BODY_EDITOR_TEXT_AREA_ID,
        IMAGE_UPLOAD_EP,
        FROALA_IMAGE_REMOVED__EVENT,
        REMOVE_IMAGE__EP,
        IMAGE_DELETED__MSG,
        IMAGE_COULDNT_BE_DELETED__ERR_MSG
    } = config;

    setUpFroalaEditor();

    function setUpFroalaEditor() {
        setUpImageMarginLeftCustomBtn();

        $(ARTICLE_BODY_EDITOR_TEXT_AREA_ID).froalaEditor({
            height: 300,
            imageUploadURL: IMAGE_UPLOAD_EP,
            imageUploadMethod: 'POST',
            toolbarButtons: ['fullscreen', 'bold', 'italic', 'underline', 'strikeThrough', 'subscript', 'superscript', '|', 'fontFamily', 'fontSize', 'color', 'inlineClass', 'inlineStyle', 'paragraphStyle', 'lineHeight', '|', 'paragraphFormat', 'align', 'formatOL', 'formatUL', 'outdent', 'indent', 'quote', '-', 'insertLink', 'insertImage', 'insertVideo', 'embedly', 'insertFile', 'insertTable', '|', 'emoticons', 'fontAwesome', 'specialCharacters', 'insertHR', 'selectAll', 'clearFormatting', '|', 'print', 'getPDF', 'spellChecker', 'help', '|', 'undo', 'redo'],
            imageEditButtons: ['imageReplace', 'imageAlign', 'imageCaption', 'imageRemove', '|', 'imageLink', 'linkOpen', 'linkEdit', 'linkRemove', '-', 'imageDisplay', 'imageStyle', 'setImageMarginLeft', 'imageAlt', 'imageSize', "imageMarginLeftIcon", "imageMarginRightIcon"]
        })
        .on(FROALA_IMAGE_REMOVED__EVENT, function (e, editor, $img) {
            $.ajax({
              method: 'DELETE',
              url: REMOVE_IMAGE__EP,
              data: {
                src: $img.attr('src')
              }
            })
            .done (function (data) {
              console.log (IMAGE_DELETED__MSG);
            })
            .fail (function (err) {
              console.log (IMAGE_COULDNT_BE_DELETED__ERR_MSG + JSON.stringify(err));
            })
        });
    }
});

function setUpImageMarginLeftCustomBtn() {
    $.FroalaEditor.DefineIcon('setImageMarginLeft', {NAME: 'star'});
    $.FroalaEditor.RegisterCommand('setImageMarginLeft', {
      title: 'setImageMarginLeft',
      focus: false,
      undo: false,
      refreshAfterCallback: false,
      callback: function () {
        var $img = this.image.get();
        $img.toggleClass("image-margin-left");
        if($img.hasClass("image-margin-left")) {
            alert('class left is set');
        } else {
            alert('class left is unset');
        }
      }
    });
/*
    $.FroalaEditor.DefineIcon('imageMarginRightIcon', {NAME: 'info'});
    $.FroalaEditor.RegisterCommand('imageMarginRightIcon', {
        title: 'imageMarginRightIcon',
        focus: true,
        undo: true,
        refreshAfterCallback: false,
        callback: function () {
            var $img = this.image.get();
            $img.toggleClass("image-margin-right");
            if($img.hasClass("image-margin-right")) {
                alert('class right is set');
            } else {
                alert('class right is unset');
            }
        }
    });*/
    
    $.FroalaEditor.DefineIcon('imageMarginRightIcon', {NAME: 'info'});
    $.FroalaEditor.RegisterCommand('imageMarginRightIcon', {
        title: 'imageMarginRightIcon',
        focus: true,
        undo: true,
        refreshAfterCallback: false,
        callback: function () {
            var $img = this.image.get();
            $img.toggleClass("image-margin-right");
            if($img.hasClass("image-margin-right")) {
                alert('class right is set');
            } else {
                alert('class right is unset');
            }
        }
    });
}

/*
$.FroalaEditor.DefineIcon('imageMarginRightIcon', {NAME: 'info'});
    $.FroalaEditor.RegisterCommand('imageMarginRightIcon', {
        title: 'imageMarginRightIcon',
        focus: true,
        undo: true,
        refreshAfterCallback: false,
        callback: function () {
            var $img = this.image.get();
            $img.toggleClass("image-margin-right");
            if($img.hasClass("image-margin-right")) {
                alert('class right is set');
            } else {
                alert('class right is unset');
            }
        }
    });*/
},{}],5:[function(require,module,exports){
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
},{}],6:[function(require,module,exports){

module.exports = ((config) => {
    const {
        IMAGE_PREVIEW_ELEM__SEL,
        BROWSE_BTN__SEL,
        DISPLAYED_IMG__HEIGHT
    } = config;
    
    const IMAGE_BROWSE_BTN = $(BROWSE_BTN__SEL);
    const PREVIEW_ELEM = $(IMAGE_PREVIEW_ELEM__SEL);

    displayBrowsedImage();

    function displayBrowsedImage() {
        IMAGE_BROWSE_BTN.on('change', function() {
            let imageToDisplay = IMAGE_BROWSE_BTN.prop('files')[0];

            let isFileAnImage = imageToDisplay.type.startsWith('image/');
            if (isFileAnImage) {
                removePrevDisplayedImg();
                displayImage(imageToDisplay)
            } else {

            };

        });
    }

    function removePrevDisplayedImg() {
        PREVIEW_ELEM.empty();
    }
    
    function displayImage(imageToDisplay) {
        const img = document.createElement("img");
        img.classList.add("obj");
        img.file = imageToDisplay;
        img.setAttribute('height', DISPLAYED_IMG__HEIGHT);
        PREVIEW_ELEM.append(img);

        let reader  = new FileReader();
        reader.onload = (function(aImg) { 
            return function(e) { 
                aImg.src = e.target.result; 
            }; 
        })(img);
    
        reader.readAsDataURL(imageToDisplay);
    };
});
},{}],7:[function(require,module,exports){
const FlashMessage = require('front-end-widgets/bootstrap-flash-message');
let {sendPUTFormRequest} = require('front-end-widgets/utils');

module.exports = ((config) => {
    const {
        UPDATE_ARTICLE__EP,
        FALLBACK_ERR_FLASH,
        FLASH_MSGS_DIV__SEL
    } = config

    const submitButton = $('[type="submit"]');
    const pageTitleInput = document.querySelector('[name="pageTitle"]');
    const articleIdInput = document.querySelector('[name="articleId"]');
    const articleNameInput = document.querySelector('[name="articleName"]');
    const CHECK_BOXES_NAME_ATTR = 'articleCategories[]';
    const selectedArticleCategsCheckboxes = $(`[name="${CHECK_BOXES_NAME_ATTR}"]:checked`);
    const teasersHtmlTextArea = document.querySelector('[name="teasersHtml"]');
    const articleBodyTextArea = document.querySelector('[name="articleHtml"]');
    const squareArticleProfileImgInput = document.querySelector('[name="squareArticleProfileImg"]');
    const flatArticleProfileImgInput = document.querySelector('[name="flatArticleProfileImg"]');

    sendPUTFormRequest = sendPUTFormRequest({
        UPDATE_ARTICLE__EP,
        FLASH_MSGS_DIV__SEL,
    })

    return updateArticleData();

    function updateArticleData() {
        submitButton.on('click', function(e) {
            e.preventDefault();

            let editArticleFormData = getFormData();
            sendPUTFormRequest(editArticleFormData);
            // sendUpdateArticleRequest(editArticleFormData);
        });
    }

    function getFormData() {
        var formData = new FormData();

        formData.append(articleIdInput.name, articleIdInput.value);
        formData.append(pageTitleInput.name, pageTitleInput.value);
        formData.append(articleNameInput.name, articleNameInput.value);
        formData.append(teasersHtmlTextArea.name, teasersHtmlTextArea.value);
        formData.append(articleBodyTextArea.name, articleBodyTextArea.value);
        
        selectedArticleCategsCheckboxes.each((i, checkBox) => {
            checkBox.value
            formData.append(CHECK_BOXES_NAME_ATTR, checkBox.value);
        });

        let hasNewSquareArticleProfileImg = squareArticleProfileImgInput.files.length > 0;
        if (hasNewSquareArticleProfileImg) {
            let fieldName = squareArticleProfileImgInput.name
            formData.append(fieldName, squareArticleProfileImgInput.files[0]);
        }

        let hasNewFlatArticleProfileImg = flatArticleProfileImgInput.files.length > 0;
        if (hasNewFlatArticleProfileImg) {
            fieldName = flatArticleProfileImgInput.name
            formData.append(fieldName, flatArticleProfileImgInput.files[0]);
        }

        return formData;
    }

    function sendUpdateArticleRequest(editArticleFormData) {
        $.ajax(UPDATE_ARTICLE__EP, {
            type : "PUT",
            data: editArticleFormData,
            contentType: false,
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
});

},{"front-end-widgets/bootstrap-flash-message":5,"front-end-widgets/utils":8}],8:[function(require,module,exports){
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
},{"front-end-config":2,"front-end-widgets/bootstrap-flash-message":5}]},{},[3]);
