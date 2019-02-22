const config = require('config');

const {getArticlesDataByCategory, getBlogNavLinks} = require('widgets/router-utils');

const FOUR_O_FOUR_VIEW_VIEW__PATH = config.viewPathes.fourOFour,
    FOUR_O_FOUR_VIEW__TITLE = config.templateConf.fourOFour.title,
    FOUR_O_FOUR_VIEW__ID = config.templateConf.fourOFour.id;
    
module.exports = get404view;
    
function get404view(req, res, next) {
    Promise.all([
        getArticlesDataByCategory(),
        getBlogNavLinks()
    ])
    .then((results) => {
        render404view(res, results);
    })
    .catch(err => {
        next(err)
    });
}

function render404view(res, results) {
    res.locals.pageTitle = FOUR_O_FOUR_VIEW__TITLE;
    res.locals.pageId = FOUR_O_FOUR_VIEW__ID;
    res.locals.navLinks = results[1]
    res.locals.articlesByCategoryArr = results[0],

    res.render(FOUR_O_FOUR_VIEW_VIEW__PATH);
}