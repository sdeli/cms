const config = require('config');
const express = require('express');
const adminRouter = express.Router();
let {requireBeAuthenticated} = require('widgets/middlewares');

const adminArticlesRouter = require('./admin-articles-router/admin-articles-router.js');
const adminArticleCategoriesRouter = require('./admin-article-categories-router/admin-article-categories-router.js');
const getAdminIndexView = require('./get-admin-index-view/get-admin-index-view.js');
const adminUsersRouter = require('./admin-users-router/admin-users-router.js');
const adminAuthRouter = require('./admin-auth-router/admin-auth-router.js');

const MOUNT_TO_ADMIN__EP = config.restEndpoints.admin.index;

requireBeAuthenticatedMount = requireBeAuthenticated(MOUNT_TO_ADMIN__EP);
requireBeAuthenticated = requireBeAuthenticated('');

adminRouter.use("/admin/articles", requireBeAuthenticatedMount);
adminRouter.use("/admin/article-categories", requireBeAuthenticatedMount);
adminRouter.use(adminArticlesRouter);
adminRouter.use(adminArticleCategoriesRouter);
adminRouter.use(adminUsersRouter);
adminRouter.use(adminAuthRouter);
adminRouter.get(config.restEndpoints.admin.index, requireBeAuthenticated, getAdminIndexView);

module.exports = adminRouter;