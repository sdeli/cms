const config = require('config');
const {getBlogNavLinks} = require('widgets/router-utils');

const APPLY_VIEW__PATH = config.viewPathes.blog.apply, 
    APPLY_VIEW__ID = config.templateConf.blog.apply.id,
    APPLY_VIEW__TITLE = config.templateConf.blog.apply.title;
    POST_APPLICATION_DATA__EP = config.restEndpoints.blog.furtherApplicationData

module.exports = getApplyView;

function getApplyView(req, res){
    let isRequestFromPrevValidationErr = Boolean(Object.keys(req.body).length);
    if (isRequestFromPrevValidationErr) {
        var contactFormData = req.body;
    } else {
        var contactFormData = {};
    }

    getBlogNavLinks()
    .then(navLinks => {
        renderApplyView(res, contactFormData, navLinks);
    })
    .catch(err => {
        next(err);
    });
}

function renderApplyView(res, contactFormData, navLinks) {
    res.locals.pageTitle = APPLY_VIEW__TITLE;
    res.locals.pageId = APPLY_VIEW__ID;
    res.locals.postApplicationDataEp = POST_APPLICATION_DATA__EP;
    res.locals.navLinks = navLinks;
    res.locals.contactFormData = contactFormData;

    res.render(APPLY_VIEW__PATH);
}