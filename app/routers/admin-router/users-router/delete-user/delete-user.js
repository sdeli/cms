const config = require('config');
const usersModel = require('models/user-model');
const authorize = require('widgets/authorize');

const REDIRECT__EP = config.restEndpoints.admin.users.listView,
  DELETE_USER_SUCC_FLASH = config.flashMsgs.admin.users.delete.succ,
  USER_DOESNT_EXISTS__ERR_FLASH = config.flashMsgs.admin.users.delete.err.noUser,
  NOT_AUTHORIZED_TO_DELETE__ERR_FLASH = config.flashMsgs.admin.users.delete.err.notAuth;

module.exports = deleteUser;

async function deleteUser(req, res) {
    let targetUserId = req.params.userId;
    
    try {
        var targetUserObj = await usersModel.getUserById(targetUserId);
        let userDoesntExists = !targetUserObj;
        if (userDoesntExists) return denyUserDeletion(res, USER_DOESNT_EXISTS__ERR_FLASH)
    
        if (!isUserAuthorizedToDeleteTargetUserCheck(req, targetUserObj)) {
            return denyUserDeletion(res, NOT_AUTHORIZED_TO_DELETE__ERR_FLASH);
        }
    } catch (err) {
        next(err);
    }
    

    usersModel.deleteUserFromDb(targetUserId)
    .then((isUserDeleted) => {
        if (isUserDeleted) {
            notifyAboutDeletedUser(res)
        } else {
            denyUserDeletion(res)
        }
    })
    .catch(e => {
        next(e);
    });
}

function isUserAuthorizedToDeleteTargetUserCheck(req, targetUserObj) {
    let currUserAuthLevel = req.user.privilage;
    let targetUserAuthLevel = targetUserObj.privilage;

    let userCanDeleteTarget = authorize.canTargetBeChangedBy(currUserAuthLevel, targetUserAuthLevel);
    return userCanDeleteTarget;
}

function denyUserDeletion(res, errFlash) {
    res.flash.toNext(res.flash.WARNING, errFlash);
    // redirect will happen on front end after redirect flash msg will be displayed
    res.send(REDIRECT__EP);
}

function notifyAboutDeletedUser(res) {
    res.flash.toNext(res.flash.SUCCESS, DELETE_USER_SUCC_FLASH);
    // redirect will happen on front end after redirect flash msg will be displayed
    res.send(REDIRECT__EP);
}