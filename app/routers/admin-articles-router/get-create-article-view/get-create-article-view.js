module.exports = ((config) => {
    const {CREATE_ARTICLE__VIEW, CREATE_ARTICLE_VIEW__TITLE, CREATE_ARTICLE_VIEW__ID, SEND_ARTICLE_DATA_TO__EP} = config;

    return getCreateArticleView;

    function getCreateArticleView(req, res) {
        res.render(CREATE_ARTICLE__VIEW, {
            pageTitle : CREATE_ARTICLE_VIEW__TITLE,
            pageId : CREATE_ARTICLE_VIEW__ID,
            postDataToRoute : SEND_ARTICLE_DATA_TO__EP
        });
    }
});