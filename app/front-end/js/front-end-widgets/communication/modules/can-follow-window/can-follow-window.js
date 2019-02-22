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