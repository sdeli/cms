const express = require('express');
const localLoginRouter = express.Router();
const passport = require('passport');
const env = process.env;

localLoginRouter.post(env.LOCAL_LOGIN_POST_USER_DATA__EP,
    passport.authenticate(env.LOCAL_LOGIN__TYPE, { 
        successRedirect: env.LOCAL_LOGIN_SUCC_RED__EP, 
        failureRedirect: env.LOCAL_LOGIN_ERR_RED__EP
    })
);

localLoginRouter.get(env.LOCAL_LOGIN_SUCC_RED__EP, (req, res) => {
    res.send(env.LOCAL_LOGIN__SUCC_FLASH)
});

localLoginRouter.get(env.LOCAL_LOGIN_ERR_RED__EP, (req, res) => {
    res.send(env.LOCAL_LOGIN__ERR_FLASH)
});

module.exports = localLoginRouter;