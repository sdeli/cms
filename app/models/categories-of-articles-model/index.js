const Singleton = require('singleton');
const categsOfArticlesModel = require('./moduls/categories-of-articles-model/categories-of-articles-model.js');

module.exports = Singleton(categsOfArticlesModel);