const express = require('express');
const config = require('config');
const articleCategoriesRouter = express.Router();

const {moveSessionBodyToReq} = require('widgets/middlewares');

let restEp = config.restEndpoints;

let getAddArticleCategoryView = require('./get-add-article-category-view/get-add-article-category-view.js');
let getArticleCategoriesListView = require('./get-article-categories-list-view/get-article-categories-list-view.js');
let createArticleCategory = require('./create-article-category/create-article-category.js');
let deleteArticleCategory = require('./delete-article-category/delete-article-category.js');
let getEditArticleCategoryView = require('./get-edit-article-category-view/get-edit-article-category-view.js');
let updateArticleCategory = require('./update-article-category/update-article-category.js')
let updateArticleCategoriesSort = require('./update-article-categorie-sort/update-article-categories-sort.js')

// articleCategoriesRouter.use(requireBeAuthenticated);
articleCategoriesRouter.get(restEp.admin.articleCategory.createView, moveSessionBodyToReq, getAddArticleCategoryView);
articleCategoriesRouter.get(restEp.admin.articleCategory.listView, getArticleCategoriesListView);
articleCategoriesRouter.post(restEp.admin.articleCategory.create, createArticleCategory);
articleCategoriesRouter.delete(restEp.admin.articleCategory.delete, deleteArticleCategory);
articleCategoriesRouter.get(restEp.admin.articleCategory.editView, moveSessionBodyToReq,getEditArticleCategoryView);
articleCategoriesRouter.put(restEp.admin.articleCategory.update, updateArticleCategory);
articleCategoriesRouter.put(restEp.admin.articleCategory.updateSort, updateArticleCategoriesSort);

module.exports = articleCategoriesRouter;