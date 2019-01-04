const express = require('express');
const registerRouter = express.Router();
const config = require('config');

let restEp = config.restEndpoints;

let getRegisterPg = require('./get-register-pg/get-register-pg');
let postRegisterData = require('./post-register-data/post-register-data.js');

registerRouter.get(restEp.registerUser.registerView, (req, res) => getRegisterPg(req, res));
registerRouter.post(restEp.registerUser.create, (req, res) => postRegisterData(req, res));

module.exports = registerRouter;