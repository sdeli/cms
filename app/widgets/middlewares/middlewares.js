const config = require('config');
const austhorize = require('widgets/authorize');

const GET_LOG_VIEW_IN__EP = config.restEndpoints.admin.auth.logInView.replace(/(.*\/)(:\w+\?)/, '$1'),
    GET_TMP_LOGIN_VIEW = `${GET_LOG_VIEW_IN__EP}tmp`,
    GET_ADMIN_INDEX_VIEW__EP = config.restEndpoints.admin.index,
    GET_CHANGE_TMP_PWD_VIEW__EP = config.restEndpoints.admin.auth.changeTmpPwdView,
    REQUIRE_LOG_IN__MSG = config.flashMsgs.auth.requireLogin,
    DENY_ACCESS_OF_CURR_EP__ERR_FLASH = config.flashMsgs.generalErr.lowAuthLevel;

const Middlewares = (() => {
    function moveSessionBodyToReq(req, res, next) {
        let hasSessionBodyObj = Boolean(req.session.body && req.body);
        if (hasSessionBodyObj) {
            req.body = req.session.body;
            delete req.session.body;
        }

        next();
    }

    function keepTrackOfPrevUrl(req, res, next) {
        // req.session.currUrl is the current ourl of the previous call so in this case that is the prevUrl.
        let isPrevUrlRecorded = Boolean(req.session.currUrl);
        if (isPrevUrlRecorded) {
            req.session.prevUrl = req.session.currUrl;
            req.session.currUrl = req.url
        } else {
            req.session.currUrl = req.url
        }

        next();
    }

    function requireBeAuthenticated(epMount) {
        // epMount is the route to which the middleware is mounted to
        return (req, res, next) => {
            console.log(req.url);
            let isLoggedIn = req.isAuthenticated() && !req.user.isTmp;
            if (isLoggedIn) return next();
            
            let isTemporarilyLoggedIn = req.isAuthenticated() && req.user.isTmp;
            if (isTemporarilyLoggedIn) return res.redirect(GET_CHANGE_TMP_PWD_VIEW__EP); 

            res.flash.toNext(res.flash.WARNING, REQUIRE_LOG_IN__MSG);
            req.session.requestedUrl = `${epMount}${req.url}`;
            res.redirect(GET_LOG_VIEW_IN__EP);
        }
    }

    function requireBeTmpAuthenticated(req, res, next) {
        let isTemporarilyLoggedIn = req.isAuthenticated() && req.user.isTmp;
        console.log(req.url);
        if (isTemporarilyLoggedIn) return next();

        res.redirect(GET_TMP_LOGIN_VIEW);
    }

    function redirectIfLoggedIn(req, res, next) {
        let isLoggedIn = req.isAuthenticated();
        console.log(req.url);
        if (!isLoggedIn) return next();

        let isTmpLoggedIn = isLoggedIn && req.user.isTmp
        if (isTmpLoggedIn) return res.redirect(GET_CHANGE_TMP_PWD_VIEW__EP);

        res.redirect(GET_ADMIN_INDEX_VIEW__EP);
    }

    function requireAuthLevel2(req, res, next) {
        console.log(req.url);
        let isUserAuthorizedToAccessEp = austhorize.level2(req.user.privilage);
        if (isUserAuthorizedToAccessEp) return next();

        res.flash.toNext(res.flash.WARNING, DENY_ACCESS_OF_CURR_EP__ERR_FLASH);
        res.redirect(GET_ADMIN_INDEX_VIEW__EP);
    }

    function log(req, res, next) {
        console.log(req.url);
        next();
    } 

    return {
        moveSessionBodyToReq,
        keepTrackOfPrevUrl,
        requireBeAuthenticated,
        redirectIfLoggedIn,
        requireBeTmpAuthenticated,
        requireAuthLevel2,
        log
    }
})();

module.exports = Middlewares;