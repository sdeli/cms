const config = require('config');

const express = require('express');

var multer  = require('multer')
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, config.relativePathes.public.img.article.profile)
  },
  filename: function (req, file, cb) {
    cb(null, `${file.fieldname.toLowerCase()}-${Date.now()}`)
  }
})
 
var upload = multer({ storage: storage })

const adminArticlesRouter = express.Router();

let restEp = config.restEndpoints;

let getArticleListView = require('./get-article-list-view/get-article-list-view.js')({
  ARTICLE_LIST_VIEW__PATH : config.viewPathes.admin.article.list,
  ARTICLE_LIST_VIEW__TITLE : config.templateConf.admin.article.list.title,
  ARTICLE_LIST_VIEW__ID : config.templateConf.admin.article.list.id,
  ADMIN_ARTICLE_CREATE_VIEW__EP : restEp.admin.article.createView
});

let getCreateArticleView = require('./get-create-article-view/get-create-article-view.js')({
  CREATE_ARTICLE_VIEW__PATH : config.viewPathes.admin.article.createEdit,
  CREATE_ARTICLE_VIEW__TITLE : config.templateConf.admin.article.create.title,
  CREATE_ARTICLE_VIEW__ID : config.templateConf.admin.article.create.id,
  SEND_ARTICLE_DATA_TO__EP : restEp.admin.article.create,
  ARTICLE_CATEGORY_CHECKBOX_GROUP__NAME : config.general.articleCategoryCheckboxGroupName
});

let getEditArticleView = require('./get-edit-article-view/get-edit-article-view.js')({
  ARTICLE_NOT_FOUND__ERR_MSG : config.errorMsgs.general.articleNotFound,
  TEASERS__PATH : config.absolutePathes.teasersPath, 
  ARTICLES__PATH : config.absolutePathes.articlesPath,
  ARTICLE_CATEGORY_CHECKBOX_GROUP__NAME : config.general.articleCategoryCheckboxGroupName,
  EDIT_ARTICLE_VIEW__PATH : config.viewPathes.admin.article.createEdit,
  EDIT_ARTICLE_VIEW__TITLE : config.templateConf.admin.article.edit.title,
  EDIT_ARTICLE_VIEW__ID : config.templateConf.admin.article.edit.id,
  UPDATE_ARTICLE__EP : restEp.admin.article.update,
  FAILURE_REDIRECT__EP : restEp.admin.article.ListView,
  FALIRUE__ERR_FLASH : config.flashMsgs.generalErr.request
});

let deleteArticle = require('./delete-article/delete-article.js')({
  TEASERS__PATH : config.absolutePathes.teasersPath, 
  ARTICLES__PATH : config.absolutePathes.articlesPath,
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
  CREATE_EDIT_ARTICLE_VIEW__PATH : config.viewPathes.admin.article.createEdit, 
  CREATE_ARTICLE_VIEW__TITLE : config.templateConf.admin.article.create.title, 
  CREATE_ARTICLE_VIEW__ID : config.templateConf.admin.article.create.id, 
  POST_SEND_ARTICLE_DATA_TO__EP : restEp.admin.article.create,
  ARTICLES_LIST__EP : restEp.admin.article.ListView,
  ARTICLES__PATH : config.relativePathes.articlesPath,
  TEASERS__PATH : config.relativePathes.teasersPath,
});

let updateArticleSort = require('./update-article-sort/update-article-sort.js')({
  UPDATE_ARTICLE_SORT__SUCC_FLASH : config.flashMsgs.admin.article.updateSort.succ,
  UPDATE_ARTICLE_SORT__ERR_FLASH : config.flashMsgs.admin.article.updateSort.err
});

let updateArticle = require('./update-article/update-article.js')({
  VIEW_TITLE_NOT_EMPTY__ERR_FLASH : config.flashMsgs.validationErr.viewTitle.notEmpty,
  VIEW_TITLE_CHAR_COUNT__ERR_FLASH : config.flashMsgs.validationErr.viewTitle.charCount, 
  ARTICLE_NAME_NOT_EMPTY__ERR_FLASH : config.flashMsgs.validationErr.articleName.notEmpty, 
  EMAIL_CHAR_COUNT__ERR_FLASH : config.flashMsgs.validationErr.email.charCount, 
  ARTICLE_NOT_EMPTY__ERR_FLASH : config.flashMsgs.validationErr.article.notEmpty, 
  ARTICLE_PUBLISHED__SUCC_FLASH : config.flashMsgs.admin.article.create.succ,
  TEASER_NOT_EMPTY__ERR_FLASH : config.flashMsgs.validationErr.teaser.notEmpty,
  TEASERS__PATH : config.absolutePathes.teasersPath,
  ARTICLES__PATH : config.absolutePathes.articlesPath,
  ARTICLE_PROFILE_IMG__PATH : config.relativePathes.public.img.article.profile,
  ARTICLE_PROFILE_IMG__LINK : config.links.article.img.profile,
  EDIT_ARTICLE_VIEW__PATH : config.viewPathes.admin.article.createEdit,
  EDIT_ARTICLE_VIEW__EP : restEp.admin.article.editView,
  EDIT_ARTICLE_VIEW__ID : config.templateConf.admin.article.edit.id,
  EDIT_ARTICLE_VIEW__TITLE : config.templateConf.admin.article.edit.title,
  WARNING_EVENT : config.errHandling.errEvents.warningWithReq,
  UPDATE_ARTICLE__EP : restEp.admin.article.update,
  UPDATE_ARTICLE__SUCC_FLASH : config.flashMsgs.admin.article.update.succ,
  UPDATE_ARTICLE__ERR_FLASH : config.flashMsgs.admin.article.update.err,
});

let uploadArticleBodyImage = require('./upload-article-body-image/upload-article-body-image.js')({
    ARTICLE_BODY_IMG_FOLDER___PATH : config.relativePathes.public.img.article.body,
    PUBLIC_FOLDERS__NAME : config.general.publicFoldersName
});

let removeArticleBodyImage = require('./remove-article-body-image/remove-article-body-image.js')({
    PUBLIC_FOLDER___PATH : config.relativePathes.public.self
});

adminArticlesRouter.get(restEp.admin.article.ListView, getArticleListView);
adminArticlesRouter.get(restEp.admin.article.createView, getCreateArticleView);
adminArticlesRouter.get(restEp.admin.article.editView, getEditArticleView);
adminArticlesRouter.post(restEp.admin.article.create, upload.single('articleProfileImg'), createArticle);
adminArticlesRouter.post(restEp.admin.article.updateSort, updateArticleSort);
adminArticlesRouter.get(restEp.admin.article.delete, deleteArticle);
adminArticlesRouter.post(restEp.admin.article.update, upload.single('articleProfileImg'), updateArticle);
adminArticlesRouter.post(restEp.admin.article.image.upload, uploadArticleBodyImage);
adminArticlesRouter.post(restEp.admin.article.image.remove, removeArticleBodyImage);

module.exports = adminArticlesRouter;