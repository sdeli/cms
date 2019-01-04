const express = require('express');
const adminArticlesRouter = express.Router();
const config = require('config');

let restEp = config.restEndpoints;

let getArticleListView = require('./get-article-list-view/get-article-list-view.js')({
    ARTICLE_LIST__VIEW : config.viewPathes.admin.article.list,
    ARTICLE_LIST_VIEW__TITLE : config.templateConf.admin.article.list.title,
    ARTICLE_LIST_VIEW__ID : config.templateConf.admin.article.list.id,
    ADMIN_ARTICLE_CREATE_VIEW__EP : restEp.admin.article.createView
});

let getCreateArticleView = require('./get-create-article-view/get-create-article-view.js')({
    CREATE_ARTICLE__VIEW : config.viewPathes.admin.article.createEdit,
    CREATE_ARTICLE_VIEW__TITLE : config.templateConf.admin.article.create.title,
    CREATE_ARTICLE_VIEW__ID : config.templateConf.admin.article.create.id,
    SEND_ARTICLE_DATA_TO__EP : restEp.admin.article.create
});

let getEditArticleView = require('./get-edit-article-view/get-edit-article-view.js')({
    TEASERS_PATH : config.absolutePathes.teasersPath, 
    ARTICLES_PATH : config.absolutePathes.articlesPath,
    EDIT_ARTICLE__VIEW : config.viewPathes.admin.article.createEdit,
    EDIT_ARTICLE_VIEW__TITLE : config.templateConf.admin.article.edit.title,
    EDIT_ARTICLE_VIEW__ID : config.templateConf.admin.article.edit.id,
    UPDATE_ARTICLE__EP : restEp.admin.article.update,
    FILE_DOESNT_EXIST__ERR_MSG : config.errorMsgs.general.fileDoesntExist
});

let deleteArticle = require('./delete-article/delete-article.js')({
    TEASERS_PATH : config.absolutePathes.teasersPath, 
    ARTICLES_PATH : config.absolutePathes.articlesPath,
    SUCC_REDIRECT__EP : restEp.admin.article.ListView,
    DELETE_ARTICLE__SUCC_FLASH : config.flashMsgs.admin.article.delete.succ,
    DELETE_ARTICLE__ERR_FLASH : config.flashMsgs.admin.article.delete.err
});

let createArticle = require('./create-article/create-article.js')({
    VIEW_TITLE_NOT_EMPTY__ERR_FLASH : config.flashMsgs.validationErr.viewTitle.notEmpty,
    VIEW_TITLE_CHAR_COUNT__ERR_FLASH : config.flashMsgs.validationErr.viewTitle.charCount, 
    ARTICLE_NAME_NOT_EMPTY__ERR_FLASH : config.flashMsgs.validationErr.articleName.notEmpty, 
    EMAIL_CHAR_COUNT__ERR_FLASH : config.flashMsgs.validationErr.email.charCount, 
    ARTICLE_NOT_EMPTY__ERR_FLASH : config.flashMsgs.validationErr.article.notEmpty, 
    ARTICLE_PUBLISHED__SUCC_FLASH : config.flashMsgs.admin.article.create.succ,
    TEASER_NOT_EMPTY__ERR_FLASH : config.flashMsgs.validationErr.teaser.notEmpty,
    CREATE_EDIT_ARTICLE__VIEW : config.viewPathes.admin.article.createEdit, 
    CREATE_ARTICLE_VIEW__TITLE : config.templateConf.admin.article.create.title, 
    CREATE_ARTICLE_VIEW__ID : config.templateConf.admin.article.create.id, 
    POST_SEND_ARTICLE_DATA_TO__EP : restEp.admin.article.create,
    ARTICLES_LIST__EP : restEp.admin.article.ListView
});

let updateArticleSort = require('./update-article-sort/update-article-sort.js')({
    UPDATE_ARTICLE_SORT__SUCC_FLASH : config.flashMsgs.admin.article.updateSort.succ,
    UPDATE_ARTICLE_SORT__ERR_FLASH : config.flashMsgs.admin.article.updateSort.err
});

let updateArticle = require('./update-article/update-article.js')({
    TEASERS_PATH : config.absolutePathes.teasersPath,
    ARTICLES_PATH : config.absolutePathes.articlesPath,
    EDIT_ARTICLE__VIEW : config.viewPathes.admin.article.createEdit,
    EDIT_ARTICLE_VIEW__ID : config.templateConf.admin.article.edit.id,
    EDIT_ARTICLE_VIEW__TITLE : config.templateConf.admin.article.edit.title,
    WARNING_EVENT : config.errHandling.errEvents.warningWithReq,
    UPDATE_ARTICLE__EP : restEp.admin.article.update,
    UPDATE_ARTICLE__SUCC_FLASH : config.flashMsgs.admin.article.update.succ,
    UPDATE_ARTICLE__ERR_FLASH : config.flashMsgs.admin.article.update.err,
});

adminArticlesRouter.get(restEp.admin.article.ListView, getArticleListView);
adminArticlesRouter.get(restEp.admin.article.createView, getCreateArticleView);
adminArticlesRouter.get(restEp.admin.article.editView, getEditArticleView);
adminArticlesRouter.post(restEp.admin.article.create, createArticle);
adminArticlesRouter.post(restEp.admin.article.updateSort, updateArticleSort);
adminArticlesRouter.get(restEp.admin.article.delete, deleteArticle);
adminArticlesRouter.post(restEp.admin.article.update, updateArticle);

module.exports = adminArticlesRouter;