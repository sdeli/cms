const config = require('config');
const {getBlogNavLinks} = require('widgets/router-utils');

const MAIN_VIEW__PATH = config.viewPathes.blog.main, 
    MAIN_VIEW__ID = config.templateConf.blog.main.id,
    MAIN_VIEW__TITLE = config.templateConf.blog.main.title,
    POST_APPLICATION_DATA__EP = config.restEndpoints.blog.furtherApplicationData

module.exports = getMainView;

function getMainView(req, res, next){
    let isRequestFromPrevValidationErr = Boolean(Object.keys(req.body).length);
    if (isRequestFromPrevValidationErr) {
        var contactFormData = req.body;
    } else {
        var contactFormData = {};
    }

    getBlogNavLinks()
    .then(navLinks => {
        renderMainView(res, contactFormData, navLinks);
    })
    .catch(err => {
        next(err);
    })
}

function renderMainView(res, contactFormData, navLinks) {
    res.locals.pageTitle = MAIN_VIEW__TITLE;
    res.locals.pageId = MAIN_VIEW__ID;
    res.locals.navLinks = navLinks;
    res.locals.postApplicationDataEp = POST_APPLICATION_DATA__EP;
    res.locals.contactFormData = contactFormData;

    res.render(MAIN_VIEW__PATH);
}
