const config = require('config');
const {getBlogNavLinks} = require('widgets/router-utils');

const MAIN_VIEW__PATH = config.viewPathes.blog.main, 
    MAIN_VIEW__ID = config.templateConf.blog.main.id,
    MAIN_VIEW__TITLE = config.templateConf.blog.main.title;

module.exports = getMainView;

function getMainView(req, res, next){
    getBlogNavLinks()
    .then(navLinks => {
        renderMainView(res, navLinks);
    })
    .catch(err => {
        next(err);
    })
}

function renderMainView(res, navLinks) {
    res.locals.pageTitle = MAIN_VIEW__TITLE;
    res.locals.pageId = MAIN_VIEW__ID;
    res.locals.navLinks = navLinks;

    res.render(MAIN_VIEW__PATH);
}
