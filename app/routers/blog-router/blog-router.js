const express = require('express');
const blogRouter = express.Router();
const {moveSessionBodyToReq} = require('widgets/middlewares');
const config = require('config');

let getArticleView = require('./get-article-view/get-article-view.js');
let getArticlesByCateogryView = require('./get-articles-list-view/get-articles-list-view.js');
let furtherVisitorQuestion = require('./further-visitor-question/further-visitor-question.js');
let getApplyView = require('./get-apply-view/get-apply-view.js');
let furtherApplication = require('./further-application/further-application.js');
let getMainView = require('./get-main-view/get-main-view.js');
let getAboutUsView = require('./get-about-us-view/get-about-us-view.js');
let getHotelListView = require('./get-hotel-list-view/get-hotel-list-view.js');

blogRouter.get(config.restEndpoints.blog.article, getArticleView);
blogRouter.get(config.restEndpoints.blog.articlesList, getArticlesByCateogryView);
blogRouter.post(config.restEndpoints.blog.furtherVisitorQuestion, furtherVisitorQuestion);
blogRouter.get(config.restEndpoints.blog.apply, moveSessionBodyToReq, getApplyView);
blogRouter.post(config.restEndpoints.blog.furtherApplicationData, furtherApplication);
blogRouter.get(config.restEndpoints.blog.main, getMainView);
blogRouter.get(config.restEndpoints.blog.aboutUs, getAboutUsView);
blogRouter.get(config.restEndpoints.blog.hotelList, getHotelListView);

module.exports = blogRouter;