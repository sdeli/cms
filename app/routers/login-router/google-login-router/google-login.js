const express = require('express');
const googleLoginController = express.Router();
const passport = require('passport');
const env = process.env;

googleLoginController.get(env.GOOGLE_LOGIN__EP, passport.authenticate('google', {
    scope:[env.GOOGLE_LOGIN__TYPE]
}));

googleLoginController.get(env.GOOGLE_LOGIN_RED__EP, passport.authenticate('google', {
    successRedirect: env.GOOGLE_LOGIN_SUCC_RED__EP,
    failureRedirect: env.GOOGLE_LOGIN_ERR_RED__EP
}));

googleLoginController.get(env.GOOGLE_LOGIN_SUCC_RED__EP, (req, res) => {
    res.json(req.user);
});

googleLoginController.get(env.GOOGLE_LOGIN_ERR_RED__EP, (req, res) => {
    res.send(res.GOOGLE_LOGIN__ERR_FLASH);
});

module.exports = googleLoginController;