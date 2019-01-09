module.exports = ((config) => {
    const {INDEX_VIEW__PATH, INDEX_VIEW__TITLE, INDEX_VIEW__ID} = config;

    return getHomePg;

    function getHomePg(req, res){
        res.render(INDEX_VIEW__PATH, {
            pageTitle : INDEX_VIEW__TITLE,
            pageId : INDEX_VIEW__ID
        });
    }
});