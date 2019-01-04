const express = require('express');
const config = require('config');

const loginRouter = express.Router();

let restEp = config.restEndpoints;

let getLoginPg = require('./get-login-pg/get-login-pg.js');
let googleLoginRouter = require('./google-login-router/google-login.js');
let localLoginRouter = require('./local-login-router/local-login.js');

loginRouter.get(restEp.login, (req, res) => {getLoginPg(req, res)});
loginRouter.use(googleLoginRouter);
loginRouter.use(localLoginRouter);

module.exports = loginRouter;