const config = require('config');

const CHANGE_TMP_PWD_VIEW__PATH = config.viewPathes.admin.auth.changePwdView,
    CHANGE_TMP_PWD_VIEW__TITLE = config.templateConf.admin.auth.changePwdView.title,
    CHANGE_TMP_PWD_VIEW__ID = config.templateConf.admin.auth.changePwdView.id,
    CHANGE_TMP_PWD_VIEW__EP = config.restEndpoints.admin.auth.changeTmpPwd;

module.exports = getChangeTmpPwdView;
    
function getChangeTmpPwdView(req, res) {
    let templateData = {};
    
    let isRequestFromPrevValidationErr = Boolean(Object.keys(req.body).length);
    if (isRequestFromPrevValidationErr) {
        templateData.formData = req.body;
    } else {
        templateData.formData = {};
    }

    templateData.formData.changeTmpPwdEp = CHANGE_TMP_PWD_VIEW__EP;

    renderChangeTmpPwdView(res, templateData);
}

function renderChangeTmpPwdView(res, templateData) {
    res.render(CHANGE_TMP_PWD_VIEW__PATH, {
        pageTitle : CHANGE_TMP_PWD_VIEW__TITLE,
        pageId : CHANGE_TMP_PWD_VIEW__ID,
        templateData
    });
}