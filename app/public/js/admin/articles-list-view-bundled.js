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
},{"front-end-config":2,"front-end-widgets/blog-navbar":4,"front-end-widgets/reorganize-table":17,"front-end-widgets/utils":18}],4:[function(require,module,exports){
const navDropDown = require('front-end-widgets/nav-drop-down');
const resizeNavbar = require('./modules/resize-navbar/resize-navbar.js');
const dropDownNavOnMobile = require('./modules/drop-down-nav-on-mobile/drop-down-nav-on-mobile.js');

module.exports = blogNavbar;

function blogNavbar(config) {
    const {WINDOW_MOBILE_WIDTH} = config;

    makeCurrNavLiActive();
    navDropDown({
        WINDOW_MOBILE_WIDTH,    
    });
	dropDownNavOnMobile();
	resizeNavbar();
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

},{"./modules/drop-down-nav-on-mobile/drop-down-nav-on-mobile.js":5,"./modules/resize-navbar/resize-navbar.js":10,"front-end-widgets/nav-drop-down":13}],5:[function(require,module,exports){
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
},{}],13:[function(require,module,exports){
module.exports = ((config) => {
    const {
        WINDOW_MOBILE_WIDTH,    
    } = config;
    
    const INLINE_BLOCK_GAPS = 5.4;
    const mainDropDownElem = $('.nav__drop-down');
    const dropDownMovableElem = $('.nav__drop-down__position');
    const dropDownUl = $('.nav__drop-down__position__container__ul');
    const allLiItemsContainer = $('[data-nav-li-conatiner]');
    const slideDownClass = 'nav-drop-down__position--smooth-slide-down';
    const slideUpClass = 'nav-drop-down__position--smooth-slide-up';
    const blogNavLiItemsClass = 'blog-navbar__position__menu__item';
    const MIN_GAP_BETWEEN_WINDOW_AND_NAV = 4;

    return navDropDown();
    
    function navDropDown() {
        let isOnDesktopView = window.innerWidth > WINDOW_MOBILE_WIDTH
        if (isOnDesktopView) {
            refaktorContentOfDropDown();
        } else {
            switchOffDropDownOnMobileView();
        }

        $(window).resize(() => {
            let isOnDesktopView = window.innerWidth > WINDOW_MOBILE_WIDTH
            if (isOnDesktopView) {
                refaktorContentOfDropDown();
            } else {
                switchOffDropDownOnMobileView();
            }
        });
        
        mainDropDownElem.click(() => {
            let isOnDesktopView = window.innerWidth > WINDOW_MOBILE_WIDTH
            if (isOnDesktopView) {
                toggleDropDown()
            }
        });
    }

    function toggleDropDown() {
        let isSlidedDown = dropDownMovableElem.hasClass(slideDownClass)
        let isSlidedBack = dropDownMovableElem.hasClass(slideUpClass)

        let slidedDown = isSlidedDown && !isSlidedBack;
        if (slidedDown) {
            dropDownMovableElem.removeClass(slideDownClass)
            dropDownMovableElem.addClass(slideUpClass);
            dropDownMovableElem.fadeOut();
        }

        let slidedBack = !isSlidedDown && isSlidedBack;
        if (slidedBack) {
            dropDownMovableElem.removeClass(slideUpClass)
            dropDownMovableElem.addClass(slideDownClass);
            dropDownMovableElem.fadeIn();
        }
        
        let firstClickOnDropDownButton = !isSlidedDown && !isSlidedBack;
        if (firstClickOnDropDownButton) {
            dropDownMovableElem.addClass(slideDownClass);
            dropDownMovableElem.fadeIn();
        }
    }

    function refaktorContentOfDropDown() {
        let liItemsInNavWidth = getAllListItemsInNavWidth();
        let windowInnerWidth = document.body.clientWidth;
        let allLiItems = allLiItemsContainer.children();
        let lastLiItemBeforeDropDown = allLiItems.eq(allLiItems.length - 1);
        console.log(lastLiItemBeforeDropDown.hasClass("nav__drop-down") + ' ' + lastLiItemBeforeDropDown.width());
        console.log(lastLiItemBeforeDropDown.is(":visible"));
        console.log('windowInnerWidth: ' + windowInnerWidth);
        console.log('liItemsInNavWidth: ' + liItemsInNavWidth);
        let isOverFlow = (windowInnerWidth - liItemsInNavWidth) < MIN_GAP_BETWEEN_WINDOW_AND_NAV;
        if (isOverFlow) {
            pushLiItemIntoDropDown();
            return;
        }
        
        let LiItemsInDropDown = dropDownUl.children()

        let WidthOffirstItemInDropDown = getWidth(LiItemsInDropDown.eq(0));
        let areLiItemsInDropDown = LiItemsInDropDown.length > 0;
        
        let isEnoughSpaceInNavToPushItemBack = (windowInnerWidth - liItemsInNavWidth) > WidthOffirstItemInDropDown;
        if (isEnoughSpaceInNavToPushItemBack && areLiItemsInDropDown) {
            pushLiItemFromDropDownInToNav();
        }
        

        let isNoOverFlow = (liItemsInNavWidth - windowInnerWidth) <= 0;
        if (isNoOverFlow && !areLiItemsInDropDown) {
            mainDropDownElem.hide();
        }
    }

    function getAllListItemsInNavWidth() {
        let allLiItemsArr = allLiItemsContainer.children().toArray();

        let liItemsInNavWidth = allLiItemsArr.reduce((accumulator, currLiItem, i) => {
            let isLastItemInArr = i === allLiItemsArr.length - 1;
            if (isLastItemInArr) {
                accumulator += $(currLiItem).width();
            } else {
                accumulator += $(currLiItem).width() + INLINE_BLOCK_GAPS;
            }

            return accumulator;
        }, 0);

        return liItemsInNavWidth;
    }

    function getWidth(jQueryElem) {
        let elemWidth;

        if (dropDownMovableElem.is(":hidden")) {
            dropDownMovableElem.show();
            elemWidth = jQueryElem.width();
            dropDownMovableElem.hide();
        } else {
            elemWidth = jQueryElem.width();
        }

        return elemWidth;
    }

    function pushLiItemIntoDropDown() {
        let allLiItems = allLiItemsContainer.children();
        let lastLiItemBeforeDropDown = allLiItems.eq(allLiItems.length - 2);

        lastLiItemBeforeDropDown.remove();
        lastLiItemBeforeDropDown.removeClass(blogNavLiItemsClass);

        if (mainDropDownElem.is(":hidden")) {
            mainDropDownElem.css('display', 'inline-block');
        }

        dropDownUl.prepend(lastLiItemBeforeDropDown);

        refaktorContentOfDropDown()
    }

    function pushLiItemFromDropDownInToNav() {
        let firstItemInDropDown = dropDownUl.children().eq(0)

        firstItemInDropDown.remove();
        firstItemInDropDown.addClass(blogNavLiItemsClass);

        if (mainDropDownElem.is(":hidden")) {
            mainDropDownElem.css('display', 'inline-block');
        }

        firstItemInDropDown.insertBefore(mainDropDownElem);
    }

    function switchOffDropDownOnMobileView() {
        while (dropDownUl.children().length > 0) {
            pushLiItemFromDropDownInToNav();
        }

        mainDropDownElem.hide();
    }
});
},{}],14:[function(require,module,exports){
function clreaUpClassesFromDrag(ui, className) {
    let draggedItem = $(ui.item[0]);
    draggedItem.removeClass(className);
}

module.exports = clreaUpClassesFromDrag;
},{}],15:[function(require,module,exports){
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
},{}],16:[function(require,module,exports){
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
},{"front-end-widgets/bootstrap-flash-message":12}],17:[function(require,module,exports){
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
},{"./modules/clear-up-classes-from-drag/clear-up-classes-from-drag.js":14,"./modules/preserve-item-width-while-dragged/preserve-item-width-while-dragged.js":15,"./modules/update-tables-sort/update-tables-sort.js":16,"front-end-widgets/utils":18}],18:[function(require,module,exports){
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
},{"front-end-config":2,"front-end-widgets/bootstrap-flash-message":12}]},{},[3]);