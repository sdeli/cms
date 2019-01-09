var http = require('http');
const config = require('config');
const dotenv = require('dotenv');
let err = dotenv.config({ path: '../app/.env.default' });
let env = process.env;
const express = require('express');
let app = express();
let majomRouter = require('./majom.js');




var server = http.createServer((req,res) => { 
    var image = collectRequestBody(req);
    console.log(image);
});

server.listen(3500, '127.0.0.1'	);

function collectRequestBody(req) {
    return new Promise((resolve, reject) => {
        let requestBodyUnknownType = '';

        req.on('data', (chunk) => {
            requestBodyUnknownType += chunk;
        });

        req.on('end', () => {
            try {
                resolve(requestBodyObj);
            } catch(e) {
                resolve(requestBodyUnknownType);
            }
        });

        req.on('error', (err) => {
            console.log(err);
            reject(err);
        });
    });
}
    
