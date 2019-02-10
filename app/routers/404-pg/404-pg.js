const config = require('config');

const FOUR_O_FOUR_VIEW_VIEW__PATH = config.viewPathes.fourOFour,
    FOUR_O_FOUR_VIEW__TITLE = config.templateConf.fourOFour.title,
    FOUR_O_FOUR_VIEW__ID = config.templateConf.fourOFour.id;

module.exports = fourOfourPg;
    
function fourOfourPg(req, res) {
    res.render(FOUR_O_FOUR_VIEW_VIEW__PATH, {
        pageTitle : FOUR_O_FOUR_VIEW__TITLE,
        pageId : FOUR_O_FOUR_VIEW__ID,
    });
}
