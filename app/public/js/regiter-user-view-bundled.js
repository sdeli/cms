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
            "imageCouldntBeDeletedErrMsg" : "Image delete problem: "
        }
        
    }
}
},{}],2:[function(require,module,exports){
const config = require('./assets/front-end-config.json');

module.exports = config;
},{"./assets/front-end-config.json":1}],3:[function(require,module,exports){
const config = require('front-end-config');
const displayBrowsedImage = require('front-end-widgets/display-browsed-image');

displayBrowsedImage({
    IMAGE_PREVIEW_ELEM__SEL : config.bundles.registerUser.imagePreviewElemSel,
    BROWSE_BTN__SEL : config.bundles.registerUser.imageBrowseBtnSel,
    DISPLAYED_IMG__HEIGHT : config.bundles.registerUser.displayedImgesHeight
});
},{"front-end-config":2,"front-end-widgets/display-browsed-image":4}],4:[function(require,module,exports){

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
},{}]},{},[3]);
