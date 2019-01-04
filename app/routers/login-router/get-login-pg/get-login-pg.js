const env = process.env;

function getLoginPg(req, res) {
    res.render(env.LOGIN__VIEW, {
        pageTitle : process.env.LOGIN_VIEW__TITLE,
        pageId : process.env.LOGIN_VIEW__ID
    });
}

module.exports = getLoginPg