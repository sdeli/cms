const Singleton = require('singleton');
const articlesModel = require('./moduls/articles-model/articles-model.js');

module.exports = Singleton(articlesModel);