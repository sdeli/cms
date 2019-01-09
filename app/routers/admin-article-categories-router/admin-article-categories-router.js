const express = require('express');
const config = require('config');

const adminArticleCategoriesRouter = express.Router();
let restEp = config.restEndpoints;

let getAddArticleCategoryView = require('./get-add-article-category-view/get-add-article-category-view.js')({
    CREATE_ARTICLE_CATEGORY_VIEW__PATH : config.viewPathes.admin.articleCategory.createEdit, 
    CREATE_ARTICLE_CATEGORY_VIEW__TITLE : config.templateConf.admin.articleCategory.create.title, 
    CREATE_ARTICLE_VIEW__ID : config.templateConf.admin.articleCategory.create.id, 
    CREATE_ARTICLE_CATEGORY__EP : config.restEndpoints.admin.articleCategory.create
});

let getArticleCategoriesListView = require('./get-article-categories-list-view/get-article-categories-list-view.js')({
    ARTICLE_CATEGORY_LIST_VIEW__PATH : config.viewPathes.admin.articleCategory.list, 
    ARTICLE_CATEGORY_LIST_VIEW__TITLE : config.templateConf.admin.articleCategory.list.title, 
    ARTICLE_CATEGORY_LIST_VIEW__ID : config.templateConf.admin.articleCategory.list.id, 
    ARTICLE_CATEGORY_CREATE_VIEW__EP : config.restEndpoints.admin.articleCategory.createView,
});

let createArticleCategory = require('./create-article-category/create-article-category.js')({
    ARTICLE_CATEGORY_NAME_NOT_EMPTY__ERR_FLASH : config.flashMsgs.validationErr.articleCategory.nameIsEmpty, 
    ARTICLE_CATEGORY_NAME_CHAR_COUNT__ERR_FLASH : config.flashMsgs.validationErr.articleCategory.nameCharCount,
    ARTICLE_CATEGORY_CREATED__SUCC_FLASH : config.flashMsgs.admin.articleCategory.create.succ,
    ARTICLE_CATEGORY_NOT_UNIQUE__ERR_FLASH : config.flashMsgs.validationErr.articleCategory.notUnique,
    CREATE_EDIT_ARTICLE_CATEGORY_VIEW__PATH : config.viewPathes.admin.articleCategory.createEdit,
    CREATE_ARTICLE_CATEGORY_VIEW__TITLE : config.templateConf.admin.articleCategory.create.title,
    CREATE_ARTICLE_CATEGORY_VIEW__ID : config.templateConf.admin.articleCategory.create.id,
    CREATE_ARTICLE_CATEGORY_EP : config.restEndpoints.admin.articleCategory.create,
    ARTICLE_CATEGORY_LIST_VIEW__EP : config.restEndpoints.admin.articleCategory.listView,
    ARTICLE_CATEGORY__TERM : config.validation.articleCategory.term,
    ARTICLE_CATEGORY_NAMES__MAX_LENGTH : config.validation.articleCategory.maxLength,
    ARTICLE_CATEGORY_NAMES__MIN_LENGTH : config.validation.articleCategory.minLength
});

let deleteArticleCategory = require('./delete-article-category/delete-article-category.js')({
    SUCC_REDIRECT__EP : restEp.admin.articleCategory.listView, 
    DELETE_ARTICLE_CATEGORY__SUCC_FLASH : config.flashMsgs.admin.articleCategory.delete.succ, 
    DELETE_ARTICLE_CATEGORY__ERR_MSG : config.flashMsgs.admin.articleCategory.delete.err,
    WARNING_EVENT : config.errHandling.errEvents.warningWithReq
});

let getEditArticleCategoryView = require('./get-edit-article-category-view/get-edit-article-category-view.js')({
    ARTICLE_CATEGORY_NOT_FOUND_IN_DB__ERR_MSG : config.errorMsgs.general.articleCategoryNotFoundInDb, 
    UNEXPECTED_ERR_EVENT__ERR_FLASH : config.errorMsgs.general.fallbackErr,
    EDIT_ARTICLE_CATEGORY_VIEW__PATH : config.viewPathes.admin.articleCategory.createEdit,
    EDIT_ARTICLE_CATEGORY_VIEW__TITLE : config.templateConf.admin.articleCategory.edit.title, 
    EDIT_ARTICLE_CATEGORY_VIEW__ID : config.templateConf.admin.articleCategory.edit.id, 
    UPDATE_ARTICLE_CATEGORY__EP : restEp.admin.articleCategory.update,
    FAILURE_REDIRECT__EP : restEp.admin.articleCategory.listView,
    WARNING_EVENT : config.errHandling.errEvents.warningWithReq
});

let updateArticleCategory = require('./update-article-category/update-article-category.js')({
    EDIT_ARTICLE_CATEGORY_VIEW__PATH : config.viewPathes.admin.articleCategory.createEdit,
    EDIT_ARTICLE_CATEGORY_VIEW__ID : config.templateConf.admin.articleCategory.edit.id,
    EDIT_ARTICLE_CATEGORY_VIEW__TITLE : config.templateConf.admin.articleCategory.edit.title,
    UPDATE_ARTICLE_CATEGORY__EP : restEp.admin.articleCategory.update,
    UPDATE_ARTICLE_CATEGORY__SUCC_FLASH : config.flashMsgs.admin.articleCategory.update.succ,
    UPDATE_ARTICLE_CATEGORY__ERR_FLASH : config.flashMsgs.admin.articleCategory.update.err,
    WARNING_EVENT : config.errHandling.errEvents.warningWithReq
});

adminArticleCategoriesRouter.get(restEp.admin.articleCategory.createView, getAddArticleCategoryView);
adminArticleCategoriesRouter.get(restEp.admin.articleCategory.listView, getArticleCategoriesListView);
adminArticleCategoriesRouter.post(restEp.admin.articleCategory.create, createArticleCategory);
adminArticleCategoriesRouter.get(restEp.admin.articleCategory.delete, deleteArticleCategory);
adminArticleCategoriesRouter.get(restEp.admin.articleCategory.editView, getEditArticleCategoryView);
adminArticleCategoriesRouter.post(restEp.admin.articleCategory.update, updateArticleCategory);

module.exports = adminArticleCategoriesRouter;