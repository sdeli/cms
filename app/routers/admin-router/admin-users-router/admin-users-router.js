const express = require('express');
const config = require('config');
const adminUsersRouter = express.Router();

let {requireBeAuthenticated, requireAuthLevel2} = require('widgets/middlewares');

let restEp = config.restEndpoints;

let getUsersListView = require('./get-users-list-view/get-users-list-view.js')
let deleteUsers = require('./delete-user/delete-user.js');

requireBeAuthenticated = requireBeAuthenticated('');

adminUsersRouter.get(restEp.admin.users.listView, requireBeAuthenticated, requireAuthLevel2, getUsersListView);
adminUsersRouter.get(restEp.admin.users.delete, requireBeAuthenticated, requireAuthLevel2, deleteUsers);

module.exports = adminUsersRouter;