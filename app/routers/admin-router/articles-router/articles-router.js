const config = require('config');
const express = require('express');
const {moveSessionBodyToReq} = require('widgets/middlewares');
const articlesRouter = express.Router();

var multer  = require('multer')
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, config.relativePathes.public.img.article.profile + '/')
  },
  filename: function (req, file, cb) {
    cb(null, `${file.fieldname.toLowerCase()}-${Date.now()}`)
  }
});

var upload = multer({ storage: storage })
  	.fields([{ 
		name: 'squareArticleProfileImg', 
		maxCount: 1 
	},
	{ 
		name: 'flatArticleProfileImg', 
		maxCount: 1 
	}]);

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

articlesRouter.get(restEp.admin.article.ListView, getArticleListView);
articlesRouter.get(restEp.admin.article.createView, moveSessionBodyToReq, getCreateArticleView);
articlesRouter.get(restEp.admin.article.editView, moveSessionBodyToReq, getEditArticleView);
articlesRouter.post(restEp.admin.article.create, upload, createArticle);
articlesRouter.put(restEp.admin.article.updateSort, updateArticleSort);
articlesRouter.delete(restEp.admin.article.delete, deleteArticle);
articlesRouter.put(restEp.admin.article.update, upload, updateArticle);
articlesRouter.post(restEp.admin.article.image.upload, uploadArticleBodyImage);
articlesRouter.delete(restEp.admin.article.image.remove, removeArticleBodyImage);

module.exports = articlesRouter;