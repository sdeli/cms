const config = require('config');
const usersModel = require('models/user-model');
const {getFormattedDate} = require('widgets/router-utils')

const USERS_LIST_VIEW__PATH = config.viewPathes.admin.users.list, 
    USERS_LIST_VIEW__TITLE = config.templateConf.admin.users.list.title, 
    USERS_LIST_VIEW__ID = config.templateConf.admin.users.list.id;

module.exports = getUsersListView;

function getUsersListView(req, res, next) {
    usersModel.getAllUsers()
    .then((allUsers) => {
        formateAllUsers(allUsers);

        let templateData = {
            allUsers
        }

        renderUsersListView(res, templateData);
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

function renderUsersListView(res, templateData) {
    res.render(USERS_LIST_VIEW__PATH, {
        pageTitle : USERS_LIST_VIEW__TITLE,
        pageId : USERS_LIST_VIEW__ID,
        templateData
    });
}