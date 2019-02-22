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
const blogNavbar = require('front-end-widgets/blog-navbar');
const Communication = require('front-end-widgets/communication');
const FlashMessage = require('front-end-widgets/flash-message');

FlashMessage.activateCloseBtns();
blogNavbar();
new Communication();
},{"front-end-widgets/blog-navbar":4,"front-end-widgets/communication":12,"front-end-widgets/flash-message":15}],4:[function(require,module,exports){
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
const frontEndConfig = require('front-end-config');

let canFollowWindow = require('./modules/can-follow-window/can-follow-window.js');
let canSendVisitorQuestion = require('./modules/can-send-visitor-question/can-send-visitor-question.js');

const CanFollowWindow = canFollowWindow({
    WINDOW_MEDIUM_SIZE : parseInt(frontEndConfig.general.windowMediumSize)
});

const CanSendVisitorQuestion = canSendVisitorQuestion({
    POST_USER_QUESTION__EP : frontEndConfig.restEndPoints.blog.furtherUserQuestion,
    FALLBACK_ERR_FLASH : frontEndConfig.general.fallbackErr
});


function Communication() {
    let submiteQuestionBtn = $('.communication__form__btn');

    this.COMMUNICATION_MAIN_ELEM__CLASS = 'communication';
    this.FLASH_MSGS_CONTAINER__SEL = '.communication__flash-msgs';
    this.INPUT_NAME__SEL = '.communication__form__input[name=\'name\']';
    this.INPUT_EMAIL__SEL = '.communication__form__input[name=\'email\']';
    this.INPUT_PHONE_NUM__SEL = '.communication__form__input[name=\'phoneNumber\']';
    this.INPUT_USER_QUESTION__SEL = '.communication__form__text-area[name=\'question\']';
    
    CanFollowWindow.call(this);
    CanSendVisitorQuestion.call(this);
    
    Object.assign(Communication.prototype, 
        CanFollowWindow.prototype,
        CanSendVisitorQuestion.prototype,
    );
        
    submiteQuestionBtn.click(() => {
        this.sendVisitorQuestion();
    });
    
    this.followWindow();
}
    
module.exports = Communication;
},{"./modules/can-follow-window/can-follow-window.js":13,"./modules/can-send-visitor-question/can-send-visitor-question.js":14,"front-end-config":2}],13:[function(require,module,exports){
module.exports = ((config) => {
    const {WINDOW_MEDIUM_SIZE} = config;
    
    return function CanFollowWindow() {
        STYLE_TAG__ID = `${this.COMMUNICATION_MAIN_ELEM__CLASS}-style-tag`;
        POSITION_FIXED__CLASS = `${this.COMMUNICATION_MAIN_ELEM__CLASS}--fixed`;

        commForm = $(`.${this.COMMUNICATION_MAIN_ELEM__CLASS}`);
        commFormsParent = commForm.parent();

        CanFollowWindow.prototype.followWindow = function() {
            $(window).scroll(() => {
                followWindowOnScroll();
            }).resize(() => {
                followWindowOnResize();
            });
        }

        function followWindowOnScroll() {
            // isWindowAtOrBelowCommForm => sholdCommFormStartToFollowWindow
            let isWindowAtOrBelowCommForm = window.pageYOffset >= commForm.offset().top;
            let isWindowMediumSizeOrWider = WINDOW_MEDIUM_SIZE <= window.innerWidth;
            
            if (isWindowAtOrBelowCommForm && isWindowMediumSizeOrWider) {
                createClassForFixedCommForm();
                commForm.addClass(POSITION_FIXED__CLASS);
                setFomrsWidthEqualToParent();
            }
    
            let shouldCommFormGoBackToOriginalPlace = window.pageYOffset < commFormsParent.offset().top;
                shouldCommFormGoBackToOriginalPlace &= commForm.hasClass(POSITION_FIXED__CLASS);
            if (shouldCommFormGoBackToOriginalPlace) {
                commForm.removeClass(POSITION_FIXED__CLASS);
            }
        }
    
        function followWindowOnResize() {
            let isWindowMediumSizeOrWider = WINDOW_MEDIUM_SIZE <= window.innerWidth;
            let isCommFormFollowingWindow = commForm.hasClass(POSITION_FIXED__CLASS);
    
            if (isWindowMediumSizeOrWider && isCommFormFollowingWindow) {
                setFomrsWidthEqualToParent();
                adjustCommFormsLeftPosToParent();
            } else if (!isWindowMediumSizeOrWider && isCommFormFollowingWindow) {
                // if window is small comm form should go back to its original place => calss removal does it
                commForm.removeClass(POSITION_FIXED__CLASS);
            }
        }
    
        function createClassForFixedCommForm() {
            let styleTag = $(`#${STYLE_TAG__ID}`);
    
            let doesClassAlreadyExists = styleTag.length > 0;
            if (doesClassAlreadyExists) styleTag.remove();

            let leftPosition = commFormsParent.offset().left + parseInt(commFormsParent.css('padding-left'));

            let posFixedClass = ''
                + `.${POSITION_FIXED__CLASS} {\n`
                + `position: fixed; `
                + `width: ${commFormsParent.width()}px; `
                + `top: 5px; `
                + `left: ${leftPosition}px; `
                + `z-index: 10; `
                + '};';
    
            styleTag = $(`<style id=${STYLE_TAG__ID}>${posFixedClass}</style>`)
            $(document.head).append(styleTag);
        }
        
        function setFomrsWidthEqualToParent() {
            let commFormsWidth = commFormsParent.width();
            let styleTag = $(`#${STYLE_TAG__ID}`);
    
            let updatedClass = styleTag.html().replace(/(.*width:\s)([\d\.]+)(px;.*)/, `$1${commFormsWidth}$3`);
            styleTag.html(updatedClass);
        }
    
        function adjustCommFormsLeftPosToParent() {
            let styleTag = $(`#${STYLE_TAG__ID}`);
            let newLeftPos = commFormsParent.offset().left;
    
            let updatedClass = styleTag.html().replace(/(.*left:\s)([\d\.]+)(px;.*)/, `$1${newLeftPos}$3`);
            styleTag.html(updatedClass);
        }
    }
});
},{}],14:[function(require,module,exports){
const FlashMessage = require('front-end-widgets/flash-message');

module.exports = ((config) => {
    const {
        FALLBACK_ERR_FLASH,
        POST_USER_QUESTION__EP
    } = config;

    return function CanSendVisitorQuestion() {
        const that = this;

        CanSendVisitorQuestion.prototype.sendVisitorQuestion = function() {
            let questionDataJson = collectQuestionData()
            postQuestionData(questionDataJson)
        }
        
        function postQuestionData(questionDataJson) {
            $.ajax(POST_USER_QUESTION__EP, {
                data : questionDataJson,
                contentType : 'application/json',
                type : 'POST'
            }).done(succMsg => {
                displayMessage(FlashMessage.SUCCESS, succMsg);
                wipeInputFields();
            }).fail(res => {
                if (res.responseJSON.validationErrMsgs) {
                    let {validationErrMsgs} = res.responseJSON
                    displayMessage(FlashMessage.ALERT, validationErrMsgs);
                } else {
                    displayMessage(FlashMessage.ALERT, FALLBACK_ERR_FLASH);
                }
                return;
            });
        }
        
        function collectQuestionData() {
            let questionDataJson = JSON.stringify({
                fullName : $(that.INPUT_NAME__SEL).val(),
                email : $(that.INPUT_EMAIL__SEL).val(),
                phoneNumb : $(that.INPUT_PHONE_NUM__SEL).val(),
                question : $(that.INPUT_USER_QUESTION__SEL).val(),
            });
    
            return questionDataJson
        }

        function displayMessage(type, msgs) {
            if (Array.isArray(msgs)) {
                msgs.forEach(msg => {
                    let flashMessage = new FlashMessage(type, msg, that.FLASH_MSGS_CONTAINER__SEL);
                    flashMessage.displayMessage();
                })
            } else {
                let flashMessage = new FlashMessage(type, msgs, that.FLASH_MSGS_CONTAINER__SEL);
                flashMessage.displayMessage();
            }
        }

        function wipeInputFields() {
            $(that.INPUT_NAME__SEL).val('');
            $(that.INPUT_EMAIL__SEL).val('');
            $(that.INPUT_PHONE_NUM__SEL).val('');
            $(that.INPUT_USER_QUESTION__SEL).val('');
        }
    }
});
},{"front-end-widgets/flash-message":15}],15:[function(require,module,exports){
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
},{}]},{},[3]);
