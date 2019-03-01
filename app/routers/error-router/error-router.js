const express = require('express');
const errorRouter = express.Router();
const config = require('config');

const getErrorView = require('./get-error-view/get-error-view.js');

errorRouter.get(config.restEndpoints.error, getErrorView);

module.exports = errorRouter;