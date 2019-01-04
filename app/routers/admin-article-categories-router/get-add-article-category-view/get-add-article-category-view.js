module.exports = ((config) => {
    const {CREATE_ARTICLE_CATEGORY__VIEW, CREATE_ARTICLE_CATEGORY_VIEW__TITLE, CREATE_ARTICLE_VIEW__ID, CREATE_ARTICLE_CATEGORY__EP} = config;

    return getAddArticleCategoryView;

    function getAddArticleCategoryView(req, res) {
        res.render(CREATE_ARTICLE_CATEGORY__VIEW, {
            pageTitle : CREATE_ARTICLE_CATEGORY_VIEW__TITLE,
            pageId : CREATE_ARTICLE_VIEW__ID,
            postDataToRoute : CREATE_ARTICLE_CATEGORY__EP
        });
    }
});