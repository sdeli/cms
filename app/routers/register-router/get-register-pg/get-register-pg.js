function getRegisterPg(req, res){
    res.render(env.REGISTER__VIEW, {
        pageTitle : process.env.REGISTE_VIEW__TITLE,
        pageId : process.env.REGISTER_VIEW__EP__ID
    });
}

module.exports = getRegisterPg;