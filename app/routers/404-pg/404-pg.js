module.exports = ((config) => {
    const {FOUR_O_FOUR_VIEW__TITLE, FOUR_O_FOUR_VIEW__ID, FOUR_O_FOUR_VIEW__VIEW} = config;

    return fourOfourPg;

    function fourOfourPg(req, res) {
        res.render(FOUR_O_FOUR_VIEW__VIEW, {
            pageTitle : FOUR_O_FOUR_VIEW__TITLE,
            pageId : FOUR_O_FOUR_VIEW__ID,
        });
    }
});
