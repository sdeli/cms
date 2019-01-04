
// ==== PRIVATE PROPS ====
let html, msg, type;

// ==== CLASS ====
class ErrMsg {
    constructor($msg, $type) {
        msg = $msg;
        type = $type;
        html = getHtml();
    }

    get html() {
        return html
    }
}

// ==== PRIVATE METHODS ====
function getHtml() {
    let msgHtml = ''
        +  `<div class="alert alert-${this.type}">`
            +   this.flasMsg
        +  `</div>`
    
    return msgHtml;
}



module.exports = ErrMsg;