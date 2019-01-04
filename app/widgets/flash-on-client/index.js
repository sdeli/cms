const flashConfig = require('./config.json');
const displayMessage = require('./moduls/display-message/display-message.js');

module.exports = (() => {
    class Flash {
        constructor (flasMsgsDivsCssSel) {
            this.display = displayMessage(flasMsgsDivsCssSel);
        }
        
        get SUCCESS() {
            return flashConfig.success;
        }

        get INFO() {
            return flashConfig.info;
        }

        get WARNING() {
            return flashConfig.warning;
        }
    }

    return Flash;
})();