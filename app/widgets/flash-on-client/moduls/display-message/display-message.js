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