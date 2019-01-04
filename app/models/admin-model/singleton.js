const AdminModel = require('./moduls/admin-model/admin-model.js');

singleton = (function(){
    let isConfigured = false;
    let adminModelInst;

    function configure(config) {
        if (!isConfigured) {
            isConfigured = true;
            adminModelInst = AdminModel(config);
        } else {
            return false;
        }
    }
    
    function getInst() {
        if (isConfigured) {
            isConfigured = true;
            return adminModelInst;
        } else {
            return false;
        }
    }

    return {
        configure,
        getInst
    }
})();

module.exports = singleton;

