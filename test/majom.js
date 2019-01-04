const express = require('express');
const majomRouter = express.Router();

function majom() {
    console.log(kocsag.majom);
    let kocsag;
    console.log(ide);
}

majomRouter.get('/a', majom);

module.exports = majomRouter;