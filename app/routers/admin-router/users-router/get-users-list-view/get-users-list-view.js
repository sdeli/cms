const config = require('config');
const usersModel = require('models/user-model');
const authorize = require('widgets/authorize');

const {getFormattedDate} = require('widgets/router-utils');

const USERS_LIST_VIEW__PATH = config.viewPathes.admin.users.list, 
    USERS_LIST_VIEW__TITLE = config.templateConf.admin.users.list.title, 
    USERS_LIST_VIEW__ID = config.templateConf.admin.users.list.id;

module.exports = getUsersListView;

function getUsersListView(req, res, next) {
    usersModel.getAllUsers()
    .then((allUsers) => {
        formateAllUsers(allUsers);
        renderUsersListView(req, res, allUsers);
    })
    .catch(e => {
        next(e);
    });
}

function formateAllUsers(allUsers) {
    allUsers.forEach(userObj => {
        userObj.createdAt = getFormattedDate(userObj.createdAt);
        userObj.isActive = userObj.isActive === 1 ? 'activated' : 'inactive' ;
    })
}

function renderUsersListView(req, res, allUsers) {
    res.locals.securedNavLinks = authorize.getSecuredAdminNavLinks(req.user.privilage);
    res.locals.pageTitle = USERS_LIST_VIEW__TITLE;
    res.locals.pageId = USERS_LIST_VIEW__ID;
    res.locals.allUsers = allUsers;
    res.locals.userName = req.user.name;
    
    res.render(USERS_LIST_VIEW__PATH);
}