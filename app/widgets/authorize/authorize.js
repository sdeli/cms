const config = require('config');

const SUPER_ADMIN_PRIVILAGE__TERM = config.users.privilages.superAdmin.backEnd,
    ADMIN_PRIVILAGE__TERM = config.users.privilages.admin.backEnd;
    USER_PRIVILAGE__TERM = config.users.privilages.user.backEnd,
    {securedAdminNavStaticEndPoints} = config;

const level2Links = securedAdminNavStaticEndPoints.level2;

const authorize = (() => {
    function level2(currUsersAuthLevel) {
        let authorizedPrivilages = [SUPER_ADMIN_PRIVILAGE__TERM, ADMIN_PRIVILAGE__TERM];
        let isCurrUserLevel1Authorized = authorizedPrivilages.indexOf(currUsersAuthLevel) > -1;

        return isCurrUserLevel1Authorized;
    }

    function level3(currUsersAuthLevel) {
        let authorizedPrivilages = [SUPER_ADMIN_PRIVILAGE__TERM];
        isCurrUserLevel1Authorized = authorizedPrivilages.indexOf(currUsersAuthLevel) > -1;

        return isCurrUserLevel1Authorized;
    }

    function canTargetBeChangedBy(currPrivilage, targetUserPrivilage) {
        let isTargetAUser = targetUserPrivilage === USER_PRIVILAGE__TERM;
        if (isTargetAUser) {
            let userCanChangeTarget = level2(currPrivilage);
            return userCanChangeTarget;
        }

        let isTargetAnAdmin = targetUserPrivilage === ADMIN_PRIVILAGE__TERM;
        if (isTargetAnAdmin) {
            let userCanChangeTarget = level3(currPrivilage);
            return userCanChangeTarget;
        }

        let isTargetASuperAdmin = targetUserPrivilage === SUPER_ADMIN_PRIVILAGE__TERM;
        if (isTargetASuperAdmin) {
            let userCanChangeTarget = level3(currPrivilage);
            return userCanChangeTarget;
        } else {
            throw new Error(`unknow auth level: currPrivilage: ${currPrivilage}, targetUserPrivilage: ${targetUserPrivilage}`);
        }
    }

    function getSecuredAdminNavLinks(privilage) {
        let linksAccessibleToCurrUser = [];

        let isUserEntitledToAccessThisLinks = level2(privilage)
        if (isUserEntitledToAccessThisLinks) {
            linksAccessibleToCurrUser.push(...level2Links);
        }

        return linksAccessibleToCurrUser;
    }
    
    return {
        level2,
        level3,
        canTargetBeChangedBy,
        getSecuredAdminNavLinks
    }
})();

module.exports = authorize;