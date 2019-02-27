module.exports = FlashMessage;

function FlashMessage(type, flashMsg, flashMsgsDivsCssSel) {
    this.flashMsgsDivsCssSel = flashMsgsDivsCssSel;
    this.flashElem = getFlashElem(type, flashMsg);
}
    
Object.defineProperty(FlashMessage, 'SUCCESS', {
    value: 'success',
    writable: false
});

Object.defineProperty(FlashMessage, 'ALERT', {
    value: 'danger',
    writable: false
});

function getFlashElem(type, flashMsg) {
    let flashElemInnerHtml = ''
        + `<div class="flash flash--${type}" role="alert">`
            + `<div class="flash__message"><span>${flashMsg}</span></div>`
            + '<div class="flash__close">'
                + '<button class="flash__close__btn" type="button" aria-label="Close">&times;</button>'
            + '</div>'
        + `</div>`;

    flashElem = $(flashElemInnerHtml);
    return flashElem;
}

FlashMessage.activateCloseBtns = function() {
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