(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
module.exports=
{   
    "general" : {
        "ajaxCallJsonContentType" : "application/json",
        "ajaxCallPostMethod" : "POST",
        "fallbackErr" : "An error has occured. Please contact the site admin.",
        "windowMediumSize" : "768"
    },
    "restEndPoints" : {
        "admin" : {
            "article" : {
                "image" : {
                    "upload" : "/admin/article-image/upload",
                    "remove" : "/admin/article-image/remove"
                },
                "updateSort" : "/admin/article/update-sort"
            },
            "articleCategory" : {
                "updateSort" : "/admin/article-category/update-sort"
            }
        },
        "blog" : {
            "furtherUserQuestion" : "/blog/question"
        }
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
            "teaserTextAreaId" : "#teaser",
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
const blogNavbar = require('front-end-widgets/blog-navbar');

$(document).ready(() => {
    reorganizeArticles({
        SORTABLE_TABLES__CLASS : frontEndConfig.bundles.articleList.articlesTablesClass, 
        REORG_TABLE_CONTAINMENT : frontEndConfig.bundles.articleList.reorgTableContainment,
        REORG_TABLE_PLACEHOLDERS__CLASS : frontEndConfig.bundles.articleList.reorgTablePlaceholdersClass,
        FALLBACK_ERR_FLASH : frontEndConfig.general.fallbackErr,
        UPDATE_TABLE_SORT__EP : frontEndConfig.restEndPoints.admin.article.updateSort,
    });
    
    letConfirmArticleDeletion({
        alertTriggerElemClass : frontEndConfig.bundles.articleList.deleteArticleLinksSel, 
        alertMsg : frontEndConfig.bundles.articleList.deleteArticleConfirmationWarningAlert
    });
});

blogNavbar();
},{"front-end-config":2,"front-end-widgets/blog-navbar":4,"front-end-widgets/reorganize-table":16,"front-end-widgets/utils":17}],4:[function(require,module,exports){
const resizeNavbar = require('./moduls/resize-navbar/resize-navbar.js');
const dropDownNavOnMobile = require('./moduls/drop-down-nav-on-mobile/drop-down-nav-on-mobile.js');

module.exports = blogNavbar;

function blogNavbar() {
	dropDownNavOnMobile();
	resizeNavbar();
	makeCurrNavLiActive();
}

function makeCurrNavLiActive() {
    let navLinks = $('.blog-navbar__position__menu__item a');
    let activeClass = 'blog-navbar__position__menu__item--active';
	let arrowitem = $('<i class="fas fa-arrow-circle-left"></i>');

    for (let i = 0; i < navLinks.length; i++) {
        let currNavLi = navLinks.eq(i);

        let isCurrLinkTheActiveOne = currNavLi.attr('href') === window.location.pathname
        if (isCurrLinkTheActiveOne) {
			currNavLi.parent().addClass(activeClass);
			currNavLi.append(arrowitem);
            break;
        }
    }
};

},{"./moduls/drop-down-nav-on-mobile/drop-down-nav-on-mobile.js":5,"./moduls/resize-navbar/resize-navbar.js":10}],5:[function(require,module,exports){
const toggleOnLeftInOutCloseBtn = require('./moduls/toggle-on-left-in-out-close-btn/toggle-on-left-in-out-close-btn.js');
const addEventListenerFn = require('./moduls/add-event-listener/add-event-listener.js');
const {checkIfSceenIsOnMobileView, cssAnimationClasses} = require('../utils/utils.js');

module.exports = () => {
	const navbar = $('.blog-navbar');
	const navbarMenu = $('.blog-navbar__position');
	const dropDownBtn = $('.blog-navbar__hamburger__relative-cont');
	const dropDownCloseBtn = $('.blog-navbar__position__menu__close-btn');

	const eventsArr = ['ontouchstart', 'click'];
	
	const {smoothSlideDown, smoothSlideUp} = cssAnimationClasses;

	dropDownNavOnMobile();

	function dropDownNavOnMobile() {
		addEventListenerFn(eventsArr, dropDownBtn, function() {
			let isScreenOnMobileView = checkIfSceenIsOnMobileView();

			if (isScreenOnMobileView) {
				slideDownNav();
				toggleOnLeftInOutCloseBtn(dropDownBtn);;
			}
		});

		addEventListenerFn(eventsArr, dropDownCloseBtn, function() {
			let isScreenOnMobileView = checkIfSceenIsOnMobileView();

			if (isScreenOnMobileView) {
				slideUpNav();
				toggleOnLeftInOutCloseBtn(dropDownBtn);;
			}
		});
	}

	function slideDownNav() {
		let hasAlreadyBeenAnimatedByUser = navbarMenu.hasClass(smoothSlideUp);

		if (hasAlreadyBeenAnimatedByUser) {
			navbarMenu.removeClass(smoothSlideUp)	
			navbarMenu.addClass(smoothSlideDown)	
		} else {
			navbarMenu.addClass(smoothSlideDown)	
		}
	}

	function slideUpNav() {
		navbarMenu.removeClass(smoothSlideDown)	
		navbarMenu.addClass(smoothSlideUp)	
	}
}
},{"../utils/utils.js":11,"./moduls/add-event-listener/add-event-listener.js":6,"./moduls/toggle-on-left-in-out-close-btn/toggle-on-left-in-out-close-btn.js":7}],6:[function(require,module,exports){
function addEventListenerFn(eventsArr, listenerElem, callBack) {
	isCallbackArrayOfMultiCallbacks = Array.isArray(callBack);

	if (isCallbackArrayOfMultiCallbacks) {
		let arrOfCallbacks = callBack;
		addEventListeners(eventsArr, listenerElem, arrOfCallbacks);
	} else {
		addEventListener(eventsArr, listenerElem, callBack);
	}
}

function addEventListeners(eventsArr, listenerElem, arrOfCallbacks) {
	arrOfCallbacks.forEach(callback => {
		addEventListener(eventsArr, listenerElem, callBack);
	});
}

function addEventListener(eventsArr, listenerElem, callBack) {
	eventsArr.forEach(event => {
		listenerElem.on(event, callBack);
	});
}

module.exports = addEventListenerFn;
},{}],7:[function(require,module,exports){
const {cssAnimationClasses} = require('../../../utils/utils.js');
const {hideNavDropdownBtn} = cssAnimationClasses;

function toggleOnLeftInOutCloseBtn(dropDownBtn) {
	let isCloseBtnHidden = !dropDownBtn.hasClass(hideNavDropdownBtn)

	if (isCloseBtnHidden) {
		slideCloseBtnOutOfScreen(dropDownBtn);
	} else {
		slideCloseBtnIntoScreen(dropDownBtn);
	}
}

function slideCloseBtnOutOfScreen(dropDownBtn) {
	dropDownBtn.addClass(hideNavDropdownBtn);
}

function slideCloseBtnIntoScreen(dropDownBtn) {
	dropDownBtn.removeClass(hideNavDropdownBtn);
}

module.exports = toggleOnLeftInOutCloseBtn;
},{"../../../utils/utils.js":11}],8:[function(require,module,exports){
const {cssAnimationClasses} = require('../../../utils/utils.js');

module.exports = (navbarsPositioningDiv, navbarDropDownBtn, IsScreenOnMobileView) => {
	const {smoothSlideDown, smoothSlideUp, showNavOnDesktop, hideNavDropdownBtn} = cssAnimationClasses;

	let wasNeededToShowNav = adjustNavIfScreenGoneToDesktopView();
	return wasNeededToShowNav;

	function adjustNavIfScreenGoneToDesktopView() {
		let navMarkedForBeenOnMobileView = navbarsPositioningDiv[0].hasAttribute('data-on-mobile-view');
		let screenJustGoneToDesktopView = !IsScreenOnMobileView && navMarkedForBeenOnMobileView;

		if(screenJustGoneToDesktopView){
			markNavForBeingOndesktop();
			adjustNavsPositionForDesktopView();
			return true;
		} else {
			return false;
		}
	}

	function markNavForBeingOndesktop() {
		navbarsPositioningDiv.removeAttr('data-on-mobile-view');
		navbarsPositioningDiv.attr('data-on-desktop-view', '');	
	}

	function adjustNavsPositionForDesktopView() {
		let isNavHidden = checkIfNavbarIsHidden();

		if (isNavHidden.isTrue && !isNavHidden.msg) {
			adjustHiddenMobileNavForDesktopView();
		} else if (isNavHidden.isTrue && isNavHidden.msg) {
			adjustShownMobileNavForDesktopView(isNavHidden.msg);
		} else if (!isNavHidden.isTrue) {
			adjustShownMobileNavForDesktopView();
		} else {
			console.log('something unexpected is going on');
		}
	}

	function checkIfNavbarIsHidden() {
		let navIsOutOfScreen = navbarsPositioningDiv.hasClass(smoothSlideUp);
		let navIsOnScreen = navbarsPositioningDiv.hasClass(smoothSlideDown);
		let navWasntAnimatedByUser = navIsOutOfScreen === false && navIsOnScreen === false;

		let isNavHidden = {
			isTrue : undefined,
			msg : undefined
		};

		if (navIsOutOfScreen && navIsOnScreen === false) {
			isNavHidden.isTrue = true;
			return isNavHidden;
		} else if (navWasntAnimatedByUser) {
			isNavHidden.isTrue = true;
			isNavHidden.msg = 'nav hasnt been animated by user';
			return isNavHidden;
		} else if (navIsOutOfScreen === false && navIsOnScreen) {
			isNavHidden.isTrue = false;
			return isNavHidden;
		} else {
			console.log('something unexpected happened');
			return 'something unexpected happened';
		}
	}

	function adjustHiddenMobileNavForDesktopView(wasAnimatedByUser) {
		if (wasAnimatedByUser === 'nav hasnt been animated by user') {
			navbarsPositioningDiv.addClass(showNavOnDesktop);
		} else {
			navbarsPositioningDiv.removeClass(smoothSlideUp);
			navbarsPositioningDiv.addClass(showNavOnDesktop);
		}
	}
			
	function adjustShownMobileNavForDesktopView() {
		navbarsPositioningDiv.removeClass(smoothSlideDown);
		navbarsPositioningDiv.addClass(showNavOnDesktop);

		let isDropDownBtnHidden = navbarDropDownBtn.hasClass(hideNavDropdownBtn);

		if (isDropDownBtnHidden) {
			navbarDropDownBtn.removeClass(hideNavDropdownBtn);
		}
	}
}
},{"../../../utils/utils.js":11}],9:[function(require,module,exports){
const {checkIfSceenIsOnMobileView, cssAnimationClasses} = require('../../../utils/utils.js');
const {smoothSlideUp, showNavOnDesktop} = cssAnimationClasses;

module.exports = (navbarsPositioningDiv, IsScreenOnMobileView) => {

	let wasNeededToHideNav = adjustNavIfScreenGoneToMobileView();
	return wasNeededToHideNav;

	function adjustNavIfScreenGoneToMobileView() {
		let navMarkedForBeenOnDesktopView = navbarsPositioningDiv[0].hasAttribute('data-on-desktop-view');
		let screenJustGoneToMobileView = IsScreenOnMobileView && navMarkedForBeenOnDesktopView;

		if (screenJustGoneToMobileView) {
			markNavForBeingOnMobile();
			adjustNavsPositionForMobileView();
			return true;
		} else {
			return false;
		}
	}

	function markNavForBeingOnMobile() {
		navbarsPositioningDiv.removeAttr('data-on-desktop-view');	
		navbarsPositioningDiv.attr('data-on-mobile-view', '');
	}

	function adjustNavsPositionForMobileView() {
		navbarsPositioningDiv.removeClass(showNavOnDesktop);
	}
}
},{"../../../utils/utils.js":11}],10:[function(require,module,exports){
/*
	data-on-mobile-view, data-on-desktop-view
	the navbar element is marked with data attributes to show where the website was when resized sceen.
	if the element has a data attribute for been on the mobile view onresize but now is on desktop view
	the program knows that the nav needs to be set up for desktop view. if 
	screen onresize has a mark for been on desktop view and now is on desktop view then program knows
	nav has been set up for destop view. Same appliew for mobile view. this is going on 
	from function: showAndHideNav, adjustNavIfScreenGoneToMobileView, adjustNavIfScreenGoneToDesktopView
*/

const adjustNavIfScreenGoneToMobileView = require('./moduls/adjust-nav-if-screen-gone-to-mobile-view/adjust-nav-if-screen-gone-to-mobile-view.js');
const adjustNavIfScreenGoneTodesktopView = require('./moduls/adjust-nav-if-screen-gone-to-desktop-view/adjust-nav-if-screen-gone-to-desktop-view.js');

const {cssAnimationClasses, checkIfSceenIsOnMobileView} = require('../utils/utils.js');

module.exports = () => {
	const navbarsPositioningDiv = $('.blog-navbar__position');
	const navbarDropDownBtn = $('.blog-navbar__hamburger__relative-cont')
	const {showNavOnDesktop, smoothSlideUp} = cssAnimationClasses;

	resizeNavbar();

	function resizeNavbar() {
		adjustNavToScreenSizeOnStart();

		$(window).resize(function() {
			toggleNavbarDropDownFeature();
		});
	}

	function adjustNavToScreenSizeOnStart() {
		let IsScreenOnMobileView = checkIfSceenIsOnMobileView();

		if (IsScreenOnMobileView) {
			navbarsPositioningDiv.attr('data-on-mobile-view', '');
		} else if (!IsScreenOnMobileView) {
			navbarsPositioningDiv.attr('data-on-desktop-view', '');
			navbarsPositioningDiv.addClass(showNavOnDesktop);
		} else {
			console.log('something unexpected is going on');
		}
	}

	function toggleNavbarDropDownFeature() {
		let IsScreenOnMobileView = checkIfSceenIsOnMobileView();

		if (IsScreenOnMobileView) {
			let wasNeededToHideNav = adjustNavIfScreenGoneToMobileView(navbarsPositioningDiv, IsScreenOnMobileView);
		} else {
			let wasNeededToShowNav = adjustNavIfScreenGoneTodesktopView(navbarsPositioningDiv, navbarDropDownBtn, IsScreenOnMobileView);
		}
	}
}
},{"../utils/utils.js":11,"./moduls/adjust-nav-if-screen-gone-to-desktop-view/adjust-nav-if-screen-gone-to-desktop-view.js":8,"./moduls/adjust-nav-if-screen-gone-to-mobile-view/adjust-nav-if-screen-gone-to-mobile-view.js":9}],11:[function(require,module,exports){
function checkIfSceenIsOnMobileView() {
	let windowInnerWidth = window.innerWidth;
	
	let mobileViewsWidth = 576;
	let screenIsOnMobileView = windowInnerWidth < mobileViewsWidth;

	if (screenIsOnMobileView) {
		return true;
	} else {
		return false;
	}
}


const cssAnimationClasses = {
	smoothSlideDown : 'blog-navbar__position--smooth-slide-down',
	smoothSlideUp : 'blog-navbar__position--smooth-slide-up',
	showNavOnDesktop : 'blog-navbar__position--transform-unset',
	hideNavDropdownBtn : 'blog-navbar__hamburger__relative-cont--closed'
}

module.exports = {
	checkIfSceenIsOnMobileView,
	cssAnimationClasses
}

/*function GetCssClassesForNav(navbar) {
	let cssClassHideNav = `.blog-navbar--hidden {`
		+ `transform: translateY(-100%);`
		+ `}`;

	let cssClassShowNav = `.blog-navbar--shown {`
		+ `transform: translateY(0);`
		+ `}`;

	let cssClassSmoothSlide = `.blog-navbar--smooth-slide {`
		+ `transition: transform 0.5s ease-in-out;`
		+ `}`;

	let cssClassDisplayNavbar = `.blog-navbar--displayed {`
		+ `display: block;`
		+ `top: 0px;`
		+ `}`;

	let navsCssClasses = {
		cssClassHideNav,
		cssClassShowNav,
		cssClassSmoothSlide,
		cssClassDisplayNavbar
	}

	return navsCssClasses;
}*/
},{}],12:[function(require,module,exports){
module.exports = FlashMessage;

function FlashMessage(type, flasMsg, flashMsgsDivsCssSel) {
    this.flashMsgsDivsCssSel = flashMsgsDivsCssSel;
    this.flashElem = getFlashElem(type, flasMsg);
}
    
Object.defineProperty(FlashMessage, 'SUCCESS', {
    value: 'success',
    writable: false
});

Object.defineProperty(FlashMessage, 'ALERT', {
    value: 'danger',
    writable: false
});

function getFlashElem(type, flasMsg) {
    let flashElemInnerHtml = ''
        + `<div class="flash flash--${type}" role="alert">`
            + `<div class="flash__message"><span>${flasMsg}</span></div>`
            + '<div class="flash__close">'
                + '<button class="flash__close__btn" type="button" aria-label="Close">&times;</button>'
            + '</div>'
        + `</div>`;

    flashElem = $(flashElemInnerHtml);
    return flashElem;
}

FlashMessage.activateCloseBtns = function(closeBtnElem) {
    $(document).on('click', function(e) {
        clickedItem = $(e.target);
        let isFlashMsgCloseBtn = clickedItem.hasClass('flash__close__btn');

        if (!isFlashMsgCloseBtn) return;
        
        let flashElem = clickedItem.parent().parent();
        flashElem.fadeOut(400, () => {
            flashElem.remove();
        });
    });
}

FlashMessage.prototype.displayMessage = function() {
    let flashMsgsDiv = $(this.flashMsgsDivsCssSel);

    flashMsgsDiv.prepend(this.flashElem);
}
},{}],13:[function(require,module,exports){
function clreaUpClassesFromDrag(ui, className) {
    let draggedItem = $(ui.item[0]);
    draggedItem.removeClass(className);
}

module.exports = clreaUpClassesFromDrag;
},{}],14:[function(require,module,exports){
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
},{}],15:[function(require,module,exports){
const Flash = require('front-end-widgets/flash-message');
const flash = new Flash('.flash-messages');

module.exports = ((config) => {
    const {
        FALLBACK_ERR_FLASH, 
        UPDATE_TABLE_SORT__EP, 
    } = config;

    return updateArticlesSort;
    
    function updateArticlesSort(ui) {
        let sortedRowsArr = $(ui.target).children().toArray();
    
        let articlesSortArr = formatSortedRowsArrForServer(sortedRowsArr);
        
        $.ajax(UPDATE_TABLE_SORT__EP, {
            data : JSON.stringify(articlesSortArr),
            contentType : "application/json",
            type : "POST"
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
},{"front-end-widgets/flash-message":12}],16:[function(require,module,exports){
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
        UPDATE_TABLE_SORT__EP
    } = config

    updateTablessSort = updateTablesSort({
        FALLBACK_ERR_FLASH, 
        UPDATE_TABLE_SORT__EP
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
},{"./modules/clear-up-classes-from-drag/clear-up-classes-from-drag.js":13,"./modules/preserve-item-width-while-dragged/preserve-item-width-while-dragged.js":14,"./modules/update-tables-sort/update-tables-sort.js":15,"front-end-widgets/utils":17}],17:[function(require,module,exports){
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
},{}]},{},[3]);
