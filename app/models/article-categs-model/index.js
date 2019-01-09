const Singleton = require('singleton');
const articleCategsModel = require('./moduls/article-categs-model/article-categs-model.js');

module.exports = Singleton(articleCategsModel);