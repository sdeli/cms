const fs = require('fs');

module.exports = ((config) => {
    const {ERR_LOG_FILE_PATH, NODE_ENV, ERR_HANDLER__FLASH} = config;

    return errorHandler;

    function errorHandler(err, req, res, next) {
        console.log('in error');
        if (NODE_ENV === 'development' && res) {
            console.log(err.name);
            console.log(err.stack);
            res.send(err);
        } else if (NODE_ENV === 'development' && !res) {
            console.log(err.stack);
        } else {
            internalServerErrResponse(res);
            let errText = getErrorText(req, err);
            logErr(errText);
        }
    }

    function internalServerErrResponse(res) {
        res.status(500).json({
            errMsg : ERR_HANDLER__FLASH
        });
    }

    function getErrorText(req, err) {
        let currHeaders = JSON.stringify(req.headers, null, 2);
        let currReqBody = JSON.stringify(req.body, null, 2);
        let flashMsgsFromPrevCall = JSON.stringify(req.session.flashMsgs, null, 2);
        let currCookies = JSON.stringify(req.cookies, null, 2);
        let currParams = JSON.stringify(req.params, null, 2);
        let errStackTrace = err.stack;
        let errMessage = err.message;

        let errorLogMsg = `\n\n//////////////// NEW ERROR ////////////////`
        + `\nERROR AT: ${getTimestamp()}`
        + '\n\n================= ERR MESSAGE =================\n'
        + errMessage
        + '\n\n================= STACK TRACE =================\n'
        + errStackTrace
        + '\n\n================= HEADERS =================\n'
        + currHeaders
        + '\n\n================= REQ BODY =================\n'
        + currReqBody
        + '\n\n================= REQ PARAMS =================\n'
        + currCookies
        + '\n\n================= COOKIES =================\n'
        + flashMsgsFromPrevCall
        + '\n\n================= FLASH MESSAGES FROM PREV CALL =================\n'
        + currParams
        + `\n////////////////////////////////////////////////`

        return errorLogMsg;
    }

    function getTimestamp() {
        var date = new Date();

        var month = date.getMonth() + 1;
        var day = date.getDate();
        var hour = date.getHours();
        var min = date.getMinutes();
        var sec = date.getSeconds();

        var timestamp = `${date.getFullYear()}-${month}-${day} ${hour}:${min}:${sec}`;
        return timestamp;
    }

    function logErr(errText) {
        fs.appendFile(ERR_LOG_FILE_PATH, errText, (err) => {
            if (err) console.log(err);
        });
    }
});