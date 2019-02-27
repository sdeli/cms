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