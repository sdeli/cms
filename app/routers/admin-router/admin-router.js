const config = require('config');
const express = require('express');
const adminRouter = express.Router();

let adminArticlesRouter = require('./admin-articles-router/admin-articles-router.js');
let adminArticleCategoriesRouter = require('./admin-article-categories-router/admin-article-categories-router.js');
let getAdminIndexView = require('./get-admin-index-view/get-admin-index-view.js');

adminRouter.use(adminArticlesRouter);
adminRouter.use(adminArticleCategoriesRouter);
adminRouter.get(getAdminIndexView);

module.exports = adminRouter;