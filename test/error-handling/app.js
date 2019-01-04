const express = require('express');

// ==== Err Handling ====
app.get('/err2', (req, res) => {
    res.send('no errors');
});

app.get('/unh-prom', (req, res, next) => {
    new Promise((resolve, reject) => {
        return new Promise((resolve, reject) => {
            throw new Error('majom');
        })
        .catch(e => {
            reject(e);
        });
    })
    .catch(e => {
        next(e);
    });
});

process.on('unhandledRejection', function(reason, p) {
    console.log("Unhandled Rejection:", reason.stack, p);
    throw Error('unhandledRejection');
});

app.get('/generate-unexpected-err', (req, res) => {
    var andi = req.body.gecc;
    console.log(andi.kismajom);
});

app.use((err, req, res, next) => {
    res.send('display something to the user');

    // call the logger
    next(err);
});

app.use((err, req, res, next) => {
    console.log('here you are logging')
})