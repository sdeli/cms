const express = require('express');
const blogRouter = express.Router();
const config = require('config');

let getArticleView = require('./get-article-view/get-article-view.js');
// let getAllArticlesWithCategs = require('./get-all-articles-view/get-all-articles-view.js');
let getArticlesByCateogryView = require('./get-articles-list-view/get-articles-list-view.js');

blogRouter.get(config.restEndpoints.blog.article, getArticleView);
// blogRouter.get(config.restEndpoints.blog.articlesList, getAllArticlesWithCategs);
blogRouter.get(config.restEndpoints.blog.articlesList, getArticlesByCateogryView);

module.exports = blogRouter;