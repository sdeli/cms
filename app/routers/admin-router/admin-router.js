const config = require('config');
const express = require('express');
const adminRouter = express.Router();
let {requireBeAuthenticated} = require('widgets/middlewares');

const articlesRouter = require('./articles-router/articles-router');
const articleCategoriesRouter = require('./article-categories-router/article-categories-router');
const adminIndexView = require('./get-admin-index-view/get-admin-index-view.js');
const usersRouter = require('./users-router/users-router.js');
const authRouter = require('./auth-router/auth-router');

const MOUNT_TO_ADMIN__EP = config.restEndpoints.admin.index;

requireBeAuthenticatedMount = requireBeAuthenticated(MOUNT_TO_ADMIN__EP);
requireBeAuthenticated = requireBeAuthenticated('');

adminRouter.use("/admin/articles", requireBeAuthenticatedMount);
adminRouter.use("/admin/article-categories", requireBeAuthenticatedMount);
adminRouter.use(articlesRouter);
adminRouter.use(articleCategoriesRouter);
adminRouter.use(usersRouter);
adminRouter.use(authRouter);
adminRouter.get(config.restEndpoints.admin.index, requireBeAuthenticated, adminIndexView);

module.exports = adminRouter;