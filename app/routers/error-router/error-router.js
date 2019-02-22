const express = require('express');
const errorRouter = express.Router();
const config = require('config');

const get404view = require('./get-404-view/get-404-view.js');

errorRouter.get(config.restEndpoints.error.fourOfour, get404view);

module.exports = errorRouter;