const config = require('config');
const express = require('express');
const {moveSessionBodyToReq} = require('widgets/middlewares');
const adminArticlesRouter = express.Router();

var multer  = require('multer')
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, config.relativePathes.public.img.article.profile)
  },
  filename: function (req, file, cb) {
    cb(null, `${file.fieldname.toLowerCase()}-${Date.now()}`)
  }
});

var upload = multer({ storage: storage })

let restEp = config.restEndpoints;

let getArticleListView = require('./get-article-list-view/get-article-list-view.js');
let getCreateArticleView = require('./get-create-article-view/get-create-article-view.js');
let getEditArticleView = require('./get-edit-article-view/get-edit-article-view.js');
let deleteArticle = require('./delete-article/delete-article.js');
let createArticle = require('./create-article/create-article.js');
let updateArticleSort = require('./update-article-sort/update-article-sort.js');
let updateArticle = require('./update-article/update-article.js');
let uploadArticleBodyImage = require('./upload-article-body-image/upload-article-body-image.js');
let removeArticleBodyImage = require('./remove-article-body-image/remove-article-body-image.js');

adminArticlesRouter.get(restEp.admin.article.ListView, getArticleListView);
adminArticlesRouter.get(restEp.admin.article.createView, moveSessionBodyToReq, getCreateArticleView);
adminArticlesRouter.get(restEp.admin.article.editView, moveSessionBodyToReq, getEditArticleView);
adminArticlesRouter.post(restEp.admin.article.create, upload.single('articleProfileImg'), createArticle);
adminArticlesRouter.post(restEp.admin.article.updateSort, updateArticleSort);
adminArticlesRouter.get(restEp.admin.article.delete, deleteArticle);
adminArticlesRouter.post(restEp.admin.article.update, upload.single('articleProfileImg'), updateArticle);
adminArticlesRouter.post(restEp.admin.article.image.upload, uploadArticleBodyImage);
adminArticlesRouter.post(restEp.admin.article.image.remove, removeArticleBodyImage);

module.exports = adminArticlesRouter;