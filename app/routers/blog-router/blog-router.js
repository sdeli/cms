const express = require('express');
const blogRouter = express.Router();
const config = require('config');

let getArticleView = require('./get-article-view/get-article-view.js')({
    ARTICLE_FOLDERS__PATH : config.absolutePathes.articlesPath, 
    ARTICLE__VIEW : config.viewPathes.blog.article, 
    ARTICLE_VIEW__ID : config.templateConf.blog.article.id, 
    WARNING_EVENT : config.errHandling.errEvents.warningWithReq,
    ARTICLE_NOT_FOUND : config.errorMsgs.general.articleNotFound,
    FOUR_O_FOUR_VIEW : config.viewPathes.fourOFour,
    FOUR_O_FOUR_VIEW__TITLE : config.templateConf.fourOFour.title,
    FOUR_O_FOUR_VIEW__ID : config.templateConf.fourOFour.id 
});

let getIndexView = require('./get-index-view/get-index-view.js')({
    INDEX__VIEW : config.viewPathes.blog.index, 
    INDEX_VIEW__TITLE : config.templateConf.blog.index.title, 
    INDEX_VIEW__ID : config.templateConf.blog.index.id
});

blogRouter.get(config.restEndpoints.blog.index, getIndexView);
blogRouter.get(config.restEndpoints.blog.article, getArticleView);

module.exports = blogRouter;