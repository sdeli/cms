var http = require('http');
const config = require('config');
const dotenv = require('dotenv');
let err = dotenv.config({ path: '../app/.env.default' });
let env = process.env;
const express = require('express');
let app = express();
let majomRouter = require('./majom.js');

const errorHandler = require('error-handler')({
    ERR_LOG_FILE_PATH : `${__dirname}/${config.errHandling.errLogRelativeFilePath}`,
    NODE_ENV : env.NODE_ENV, 
    ERR_HANDLER__FLASH : config.flashMsgs.generalErr.request
})

process.on('error', (err) => {
    console.log('1');
    errorHandler(err)
})
process.on('uncaughtException', (err) => {
    console.log('2');
    console.log('asdasd');
    errorHandler(err)
});

// var server = http.createServer((req,res) => { 
    //     majom();
    // });
    
    // server.listen(3500, '127.0.0.1'	);
app.use(majomRouter);

app.use(errorHandler)

app.listen(3500);