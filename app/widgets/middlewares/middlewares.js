const config = require('config');

const LOGIN_VIEW__EP = config.restEndpoints.auth.getLoginView,
    ADMIN_INDEX__EP = config.restEndpoints.admin.index;

const Middlewares = (() => {
    function authenticate() {  
        return (req, res, next) => {
            let isAuthenticated = req.isAuthenticated()
            if (isAuthenticated) {
                res.locals.isAuthenticated = isAuthenticated;
                return next();
            } else {
                res.redirect(LOGIN_VIEW__EP)
            }
        }
    }

    function redirectIfLoggedIn() {  
        return (req, res, next) => {
            let isAuthenticated = req.isAuthenticated()
            if (!isAuthenticated) {
                return next();
            } else {
                res.redirect(ADMIN_INDEX__EP)
            }
        }
    }

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

    return {
        authenticate,
        redirectIfLoggedIn,
        moveSessionBodyToReq,
        keepTrackOfPrevUrl
    }
})();

module.exports = Middlewares;