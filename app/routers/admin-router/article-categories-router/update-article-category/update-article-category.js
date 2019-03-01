const config = require('config');
const articleCategsModel = require('models/article-categs-model');
const {validateCreateArticleCategoryForm} = require('widgets/router-utils');

const GET_EDIT_ARTICLE_CATEGORY_VIEW__EP = config.restEndpoints.admin.articleCategory.editView.replace(/(.*)(\/:[a-zA-Z]+)/, '$1'),
    UPDATE_ARTICLE_CATEGORY__SUCC_FLASH = config.flashMsgs.admin.articleCategory.update.succ;

module.exports = updateArticleCategory;
    
function updateArticleCategory(req, res, next) {
    let validationErrs = validateCreateArticleCategoryForm(req);
    let articleCategoryIsCorrect = validationErrs.length === 0;
    
    if (!articleCategoryIsCorrect) {
        failureRedirect(req, res, validationErrs);
        return;
    }

    updateArticleCategoryName(req)
    .then(() => {
        notifAboutUpdatedCateg(res, articleCategoryData.newName);
    })
    .catch(err => {
        next(err);
    });
}

function updateArticleCategoryName(req) {
    let articleCategoryData = {
        currName : req.body.currArticleCategoryName,
        newName :  req.body.articleCategory
    }

    return articleCategsModel.updateArticleCategoryName(articleCategoryData);
}

function notifAboutUpdatedCateg(res, newCategName) {
    let successMsg = UPDATE_ARTICLE_CATEGORY__SUCC_FLASH;
    res.flash.toNext(res.flash.SUCCESS, successMsg);
    
    let editArticleCategEp = `${GET_EDIT_ARTICLE_CATEGORY_VIEW__EP}/${newCategName}`;
    // front end will redirect to editArticleCategEp and flash msgs will appear there
    res.send(editArticleCategEp);
}

function failureRedirect(req, res, validationErrs) {
    if (Array.isArray(validationErrs)) {
        validationErrs.forEach(validationErr => {
            res.flash.toNext(res.flash.WARNING, validationErr.msg);
        });
    } else {
        res.flash.toNext(res.flash.WARNING, validationErrs);
    }
    
    req.session.body = req.body;
    // redirect will happen on front end
    res.send(GET_EDIT_ARTICLE_CATEGORY_VIEW__EP);
}