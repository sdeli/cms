const Flash = require('./moduls/flash/flash.js');

module.exports = (() => {
    let config;

    return class FlashMessaging {
        constructor($config) {
            config = $config;    
        }

        init(req, res, next) {
            let hasFlashFunctionality = typeof req.session.flashMsgs !== 'undefined';
        
            if (hasFlashFunctionality) {
                setUpFlashMsgsFromPrevReq(req, res);
                req.session.flashMsgs = [];
            } else {
                setUpFlashFunctionality(req, res);
            }
            
            next();
        }
    }

    function setUpFlashMsgsFromPrevReq(req, res) {
        flashMsgsFromPrevReq = req.session.flashMsgs;
        flashMsgsFromPrevReqByValue = flashMsgsFromPrevReq.splice(0, flashMsgsFromPrevReq.length);
        res.locals.flashMsgs = flashMsgsFromPrevReqByValue;
        res.flash = new Flash(req, res, config);
    }
    
    function setUpFlashFunctionality(req, res) {
        req.session.flashMsgs = [];
        res.locals.flashMsgs = [];
        res.flash = new Flash(req, res, config);
    }
})();
