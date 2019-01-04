module.exports = ((config) => {
    const {INDEX__VIEW, INDEX_VIEW__TITLE, INDEX_VIEW__ID} = config;

    return getHomePg;

    function getHomePg(req, res){
        res.render(INDEX__VIEW, {
            pageTitle : INDEX_VIEW__TITLE,
            pageId : INDEX_VIEW__ID
        });
    }
});