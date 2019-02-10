(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
module.exports=
{   
    "restEndpoints" : {
        "admin" : {
            "index" : "/admin/",
            "article" : { 
                "ListView" : "/admin/articles",
                "createView" : "/admin/article/create-view",
                "editView" : "/admin/article/edit-view/:articleId",
                "create" : "/admin/article/create",
                "updateSort" : "/admin/article/update-sort",
                "update" : "/admin/article/update",
                "delete" : "/admin/article/delete/:articleId",
                "image" : {
                    "upload" : "/admin/article-image/upload",
                    "remove" : "/admin/article-image/remove"
                }
            },
            "articleCategory" : {
                "listView" : "/admin/article-categories",
                "createView" : "/admin/article-category/create-view",
                "editView" : "/admin/article-category/edit-view/:articleCategoryName",
                "create" : "/admin/article-category/create",
                "updateSort" : "/admin/article-category/update-sort",
                "update" : "/admin/article-category/update",
                "delete" : "/admin/article-category/delete/:articleCategoryName"
            }
        },
        "blog" : {
            "article" : "/blog/article/:articleFileName",
            "articlesList" : "/blog/articles/:articleCategory"
        },
        "auth" : {
            "loginView" : "/auth/login",
            "oAuth" : {
                "succRed" : "/auth/login/success",
                "failureRed" : "/auth/login/failed",
                "local" : {
                    "login" : "/auth/login/local"
                },
                "google" : {
                    "login" : "/auth/google-login/",
                    "loginRed" : "/auth/google-login/red"
                } 
            },
            "register" : {
                "registerView" : "/auth/register",
                "createUser" : "/auth/register/create"
            }
        }
    },
    "errorMsgs" : {
        "admin" : {
            "articleCategory" : {
                "notFoundInDb" : "this cateogry isnt found in db:"

            }
        },
        "general" : {
            "fallbackErr" : "An error has occured. Please contact the stie admin.",
            "dataNotFoundInDb" : "requested data not found in db",
            "articleCategoryNotFoundInDb" : "article category not found in db",
            "fileDoesntExist" : "the file trying to read doesnt exist",
            "articleNotFound" : "requested article not found in the system"
        }
    },
    "errHandling" : {
        "errLogRelativeFilePath" : "logs/err-log.txt",
        "errEvents" : {
            "warningWithReq" : "warningWithReq"
        }
    },
    "routesConfig" : {
        "adminDeleteArticleEpPathVar" : "articleId"
    },
    "viewPathes" : {
        "blog" : {
            "index" : "blog/index.ejs",
            "article" : "blog/article.ejs",
            "articlesList" : "blog/articles-list.ejs"
        },
        "login" : "auth/log-in.ejs",
        "register" : "auth/register.ejs",
        "fourOFour" : "404/404.ejs",
        "admin" : {
            "article" : {
                "createEdit" : "admin/article/create-edit-article.ejs",
                "list" : "admin/article/articles-list.ejs"
            },
            "articleCategory" : {
                "createEdit" : "admin/article-category/create-edit-article-category.ejs",
                "list" : "admin/article-category/article-categories-list.ejs"
            }
        }
    },
    "templateConf" : {
        "admin" : {
            "index" : {
                "title" : "AdminArea",
                "id" : "admin-area"
            },
            "article" : {
                "list" : {
                    "title" : "Articles List",
                    "id" : "articles-list"
                },
                "create" : {
                    "title" : "Publish An Article",
                    "id" : "publish-article"
                },
                "edit" : {
                    "title" : "Edit:",
                    "id" : "edit-article"
                }
            },
            "articleCategory" : {
                "list" : {
                    "title" : "Article Categories List",
                    "id" : "article-categories-list"
                },
                "create" : {
                    "title" : "Create An Article Categorie",
                    "id" : "create-article-category"
                },
                "edit" : {
                    "title" : "Edit:",
                    "id" : "edit-article-category"
                }
            }
        },
        "blog" : {
            "index" : {
                "title" : "HomePage",
                "id" : "home"
            },
            "article" : {
                "id" : "article"
            },
            "articlesList" : {
                "id" : "blog-articles-list",
                "title" : "blog"
            }
        },
        "auth" : {
            "login" : {
                "title" : "Login",
                "id" : "login"
            },
            "register" : {
                "title" : "Regsiter",
                "id" : "register-user"
            }
        },
        "fourOFour" : {
            "title" : "PageNotFound",
            "id" : "404"
        }
    },
    "flashMsgs" : {
        "types" : {
            "success" : "success",
            "info" : "info",
            "warning" : "danger"
        },
        "admin" : {
            "article" : {
                "update" : {
                    "succ" : "The updates you made to the article have been succesfully saved",
                    "err" : "There was an error during saving you article, please contact the site admin"
                },
                "delete" : {
                    "succ" : "The article has been succefully deleted",
                    "err" : "there has been an issue with the deletion of your article, please contact the site admin"
                },
                "updateSort" : {
                    "succ" : "The changes you made have been succesfully initiated.",
                    "err" : "there has been an error with the update please contact the site admin."
                },
                "saved" : {
                    "succ" : "article saved"
                },
                "create" : {
                    "succ" : "your article has been publshed, it should be in the article queue"
                }
            },
            "articleCategory" : {
                "create" : {
                    "succ" : "The new article category has been created and should be in the list below."
                },
                "update" : {
                    "succ" : "The update you made to the article category have been succesfully saved",
                    "err" : "There was an error during updating you article category, please contact the site admin"
                },
                "delete" : {
                    "succ" : "The article category has been succefully deleted",
                    "err" : "there has been an issue with the deletion of your article category, please contact the site admin"
                },
                "updateSort" : {
                    "succ" : "The changes you made have been succesfully initiated.",
                    "err" : "there has been an error with the update please contact the site admin."
                },
                "saved" : {
                    "succ" : "article saved"
                }
            }
        },
        "googleLogin" : {
            "err" : "failed google login"
        },
        "localLogin" : {
            "succ" : "you are now succefully logged in",
            "err" : "failed local login"
        },
        "validationErr" : {
            "viewTitle" : {
                "notEmpty" : "The page title shouldnt be empty!",
                "charCount" : "The page title should be between 1 and 25 characters!"
            },
            "articleName" : {
                "notEmpty" : "please enter a name for the article!",
                "charCount" : "The length of your email should be between 5 and 100!"
            },
            "teaser" : {
                "notEmpty" : "teaser shouldn`t be empty!"
            },
            "article" : {
                "notEmpty" : "article shouldn`t be empty!"
            },
            "articleCategory" : {
                "nameIsEmpty" : "Please enter a name for article category!",
                "nameCharCount" : "Article Category should be between 1 and 25 characters!",
                "notUnique" : "The new article category is already in the list, so it couldnt be created."
            },
            "email" : {
                "notEmpty" : "please enter a name",
                "charCount" : "The Name should be between 4 and 15 characters"
            },
            "password" : "Your password should be at least 9 characters long, contain at least one uppercase letter and at least one lowercase letter and one number, furthermore one from the following characters: !\"#$%&\\'()*+,-./:;<=>?@[\\]^_`{|}~"
        },
        "articlesBlogList" : {
            "noArtiles" : "There is an issue with the requested page, so you have been redirected"
        },
        "generalErr" : {
            "request" : "there has been an issue with your request please contact the siteadmin"
        },
        "auth" : {
            "register" : {
                "succ" : "You have succefully registered.. Now you can login with your new credentials"
            }
        }
    },
    "absolutePathes" : {
        "wwwPath" : "/home/sandor/Documents/cms-tut/app/www",
        "articlesPath" : "/home/sandor/Documents/cms-tut/app/www/articles",
        "teasersPath" : "/home/sandor/Documents/cms-tut/app/www/teasers",
        "modelsPath" : "/home/sandor/Documents/cms-tut/app/models"
    },
    "relativePathes" : {
        "public" : {
            "self" : "./public/",
            "img" : {
                "article" : {
                    "body" : "./public/img/article/body/",
                    "profile" : "./public/img/article/profile/"
                },
                "user" : {
                    "avatar" : "./public/img/user/avatar/"
                }
            }
        },
        "articlesPath" : "./www/articles",
        "teasersPath" : "./www/teasers"
    },
    "links" : {
        "article" : {
            "img" : {
                "body" : "/img/article/body/",
                "profile" : "/img/article/profile/"
            }
        },
        "user" : {
            "avatar" : "/img/user/avatar/"
        }
    },
    "expressSession" : {
        "salt" : "whatareallygreatsaltysalt",
        "resave" : false,
        "saveUninitialized" : false
    },
    "validation" : {
        "articleCategory" : {
            "term" : "articleCategory",
            "maxLength" : "25",
            "minLength" : "1"

        }
    },
    "general" : {
        "publicFoldersName" : "public",
        "articleCategoryCheckboxGroupName" : "articleCategories",
        "hostName" : "localhost:3500"
    }
}
},{}],2:[function(require,module,exports){
const frontEndConfig = require('./assets/config.json');

module.exports = frontEndConfig;
},{"./assets/config.json":1}],3:[function(require,module,exports){
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
},{}],4:[function(require,module,exports){
const config = require('./assets/front-end-config.json');

module.exports = config;
},{"./assets/front-end-config.json":3}],5:[function(require,module,exports){
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
},{"config":2,"front-end-config":4,"front-end-widgets/reorganize-table":11,"front-end-widgets/utils":12}],6:[function(require,module,exports){
const config = require('config');
const displayMessage = require('./moduls/display-message/display-message.js');

const SUCCESS = config.flashMsgs.types.success,
    INFO = config.flashMsgs.types.info,
    WARNING = config.flashMsgs.types.warning;

class Flash {
    constructor (flasMsgsDivsCssSel) {
        this.display = displayMessage(flasMsgsDivsCssSel);
    }
    
    get SUCCESS() {
        return SUCCESS;
    }

    get INFO() {
        return INFO;
    }

    get WARNING() {
        return WARNING;
    }
}

module.exports = Flash;
},{"./moduls/display-message/display-message.js":7,"config":2}],7:[function(require,module,exports){
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
},{}],8:[function(require,module,exports){
function clreaUpClassesFromDrag(ui, className) {
    let draggedItem = $(ui.item[0]);
    draggedItem.removeClass(className);
}

module.exports = clreaUpClassesFromDrag;
},{}],9:[function(require,module,exports){
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
},{}],10:[function(require,module,exports){
const Flash = require('front-end-widgets/flash-message');
const flash = new Flash('.flash-messages');

module.exports = ((config) => {
    const {
        FALLBACK_ERR_FLASH, 
        UPDATE_TABLE_SORT__EP, 
        AJAX_CALL__CONTENT_TYPE, 
        AJAX_CALL__METHOD
    } = config;

    return updateArticlesSort;
    
    function updateArticlesSort(ui) {
        let sortedRowsArr = $(ui.target).children().toArray();
    
        let articlesSortArr = formatSortedRowsArrForServer(sortedRowsArr);
        
        $.ajax(UPDATE_TABLE_SORT__EP, {
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
},{"front-end-widgets/flash-message":6}],11:[function(require,module,exports){
const preservItemWidthWhileDragged = require('./modules/preserve-item-width-while-dragged/preserve-item-width-while-dragged.js')
const clreaUpClassesFromDrag = require('./modules/clear-up-classes-from-drag/clear-up-classes-from-drag.js'); 
const updateTablesSort = require('./modules/update-tables-sort/update-tables-sort.js');

const {getUniqueStr} = require('front-end-widgets/utils');

module.exports = ((config) => {
    const {
        SORTABLE_TABLES__CLASS, 
        REORG_TABLE_CONTAINMENT,
        REORG_TABLE_PLACEHOLDERS__CLASS,
        FALLBACK_ERR_FLASH,
        UPDATE_TABLE_SORT__EP,
        AJAX_CALL__CONTENT_TYPE, 
        AJAX_CALL__METHOD
    } = config

    updateTablessSort = updateTablesSort({
        FALLBACK_ERR_FLASH, 
        UPDATE_TABLE_SORT__EP,
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
},{"./modules/clear-up-classes-from-drag/clear-up-classes-from-drag.js":8,"./modules/preserve-item-width-while-dragged/preserve-item-width-while-dragged.js":9,"./modules/update-tables-sort/update-tables-sort.js":10,"front-end-widgets/utils":12}],12:[function(require,module,exports){
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
	getUniqueStr,
	alertOnClick
};
},{}]},{},[5]);
