const express = require('express');
const blogRouter = express.Router();
const config = require('config');

let getArticleView = require('./get-article-view/get-article-view.js')({
    ARTICLE_FOLDERS___PATH : config.absolutePathes.articlesPath, 
    ARTICLE_VIEW__PATH : config.viewPathes.blog.article, 
    ARTICLE_VIEW__ID : config.templateConf.blog.article.id, 
    WARNING_EVENT : config.errHandling.errEvents.warningWithReq,
    ARTICLE_NOT_FOUND__ERR_MSG : config.errorMsgs.general.articleNotFound,
    FOUR_O_FOUR_VIEW : config.viewPathes.fourOFour,
    FOUR_O_FOUR_VIEW__TITLE : config.templateConf.fourOFour.title,
    FOUR_O_FOUR_VIEW__ID : config.templateConf.fourOFour.id 
});

let getIndexView = require('./get-index-view/get-index-view.js')({
    INDEX_VIEW__PATH : config.viewPathes.blog.index, 
    INDEX_VIEW__TITLE : config.templateConf.blog.index.title, 
    INDEX_VIEW__ID : config.templateConf.blog.index.id
});

let getArticlesBlogList = require('./get-articles-blog-list/get-articles-blog-list.js')({
    ARTICLES_BLOG_LIST_VIEW__PATH : config.viewPathes.blog.articlesList, 
    ARTICLES_BLOG_LIST_VIEW__TITLE : config.templateConf.blog.articlesList.title, 
    ARTICLES_BLOG_LIST_VIEW__ID : config.templateConf.blog.articlesList.id,
    TEASERS_FOLDERS___PATH : config.relativePathes.teasersPath,
    NO_ARTICLES__ERR_FLASH : config.flashMsgs.articlesBlogList.noArtiles,
    GET_INDEX_VIEW__EP : config.restEndpoints.blog.index
});

blogRouter.get(config.restEndpoints.blog.index, getIndexView);
blogRouter.get(config.restEndpoints.blog.article, getArticleView);
blogRouter.get(config.restEndpoints.blog.articlesList, getArticlesBlogList);

module.exports = blogRouter;