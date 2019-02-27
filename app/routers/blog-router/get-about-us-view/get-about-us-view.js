const config = require('config');
const {getBlogNavLinks} = require('widgets/router-utils');

const ABOUT_US_VIEW__PATH = config.viewPathes.blog.aboutUs, 
    ABOUT_US_VIEW__ID = config.templateConf.blog.aboutUs.id,
    ABOUT_US_VIEW__TITLE = config.templateConf.blog.aboutUs.title,
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
    res.locals.pageTitle = ABOUT_US_VIEW__TITLE;
    res.locals.pageId = ABOUT_US_VIEW__ID;
    res.locals.navLinks = navLinks;
    res.locals.postApplicationDataEp = POST_APPLICATION_DATA__EP;
    res.locals.contactFormData = contactFormData;

    res.render(ABOUT_US_VIEW__PATH);
}
