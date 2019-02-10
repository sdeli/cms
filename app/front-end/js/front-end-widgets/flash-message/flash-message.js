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