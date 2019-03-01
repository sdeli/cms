const config = require('config');

const {getArticlesDataByCategory, getBlogNavLinks} = require('widgets/router-utils');

const ERROR_VIEW_VIEW__PATH = config.viewPathes.error,
    FOUR_O_FOUR_VIEW__TITLE = config.templateConf.fourOFour.title,
    FOUR_O_FOUR_VIEW__ID = config.templateConf.fourOFour.id;
    FOUR_O_FOUR__ERR_MSG = config.errorMsgs.general.fourOfour;
    FIVE_O_ONE_VIEW__TITLE = config.templateConf.fiveOOne.title,
    FIVE_O_ONE_VIEW__ID = config.templateConf.fiveOOne.id;
    FIVE_O_ONE__ERR_MSG = config.errorMsgs.general.fiveOOne;
    
module.exports = getErrorView;
    
function getErrorView(req, res, next) {
    let errorCode = req.params.errorCode;

    Promise.all([
        getArticlesDataByCategory(),
        getBlogNavLinks()
    ])
    .then((results) => {
        res.locals.navLinks = results[1];
        res.locals.articlesByCategoryArr = results[0];

        let requested501View = errorCode === FIVE_O_ONE_VIEW__ID;
        if (requested501View) {
            return render501view(res);
        } else {
            render404view(res);
        }
    })
    .catch(err => {
        next(err)
    });
}

function render404view(res) {
    res.locals.pageTitle = FOUR_O_FOUR_VIEW__TITLE;
    res.locals.pageId = FOUR_O_FOUR_VIEW__ID;
    res.locals.errorMsg = FOUR_O_FOUR__ERR_MSG;
    
    res.render(ERROR_VIEW_VIEW__PATH);
}

function render501view(res) {
    res.locals.pageTitle = FIVE_O_ONE_VIEW__TITLE;
    res.locals.pageId = FIVE_O_ONE_VIEW__ID;
    res.locals.errorMsg = FIVE_O_ONE__ERR_MSG;
    
    res.render(ERROR_VIEW_VIEW__PATH);
}