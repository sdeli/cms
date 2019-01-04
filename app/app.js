correctCwdWhenDeubug();

// ==== Node Core Modules ====
const path = require('path');

// ==== Npm Third Party Packages ====
const dotenv = require('dotenv');
const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');

// ==== Set Up Environment ====
let err = dotenv.config({ path: './.env.default' });
let env = process.env;

// ==== Local Npm Modules ====
const config = require('config');
const validatior = require('express-validator');
const setUpPassportAuth = require('set-up-passport-auth');
const FlashMessaging = require('flash-messages');
const errorHandler = require('error-handler')({
    ERR_LOG_FILE_PATH : `${__dirname}/${config.errHandling.errLogRelativeFilePath}`,
    NODE_ENV : env.NODE_ENV, 
    ERR_HANDLER__FLASH : config.flashMsgs.generalErr.request
});

// ==== Cofigure Models ====
const adminModel = require('admin-model');
adminModel.configure({
    ARTICLE_DATA_NOT_FOUND_IN_DB__ERR_MSG : config.errorMsgs.general.articleDataNotFoundInDb,
    ARTICLE_CATOGERIE_IS_NOT_FOUND_IN_DB__ERR : config.errorMsgs.admin.articleCategory.notFoundInDb
});

// ==== Routers ====
const blogRouter = require('./routers/blog-router/blog-router.js');
const registerRouter = require('./routers/register-router/register-router.js');
const loginRouter = require('./routers/login-router/login-router.js');
const adminArticlesRouter = require('./routers/admin-articles-router/admin-articles-router.js');
const adminArticleCategoriesRouter = require('./routers/admin-article-categories-router/admin-article-categories-router.js');
const fourOfourPg = require('./routers/404-pg/404-pg.js')({
    FOUR_O_FOUR_VIEW__VIEW : config.viewPathes.fourOFour,
    FOUR_O_FOUR_VIEW__TITLE : config.templateConf.fourOFour.title,
    FOUR_O_FOUR_VIEW__ID : config.templateConf.fourOFour.id
});

// ==== App Setup ====
let app = express();
app.use(validatior());

app.use(session({
    secret: config.expressSession.salt,
    resave: config.expressSession.resave,
    saveUninitialized: config.expressSession.saveUninitialized
}))

setUpPassportAuth(app);

let staticFilesFolder = path.join(__dirname, config.relativePathes.publicFolder);
app.use(express.static(staticFilesFolder));
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());

let flash = new FlashMessaging({
    success : config.flashMsgs.types.success,
    info : config.flashMsgs.types.info,
    warning : config.flashMsgs.types.warning
});
app.use(flash.init);    

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(blogRouter);
app.use(adminArticlesRouter);
app.use(adminArticleCategoriesRouter);
app.use(fourOfourPg);

// ==== Err Handling ====
app.use(errorHandler);

process.on('warningWithReq', (message, req) => {
    let err = {
        name : 'WarningWithReq',
        stack : message
    }

    errorHandler(err, req);
})

process.on('warning', (warning) => {
    errorHandler(warning);
});

process.on('error', (err) => {
    errorHandler(err);
});

process.on('uncaughtException', (err) => {
    errorHandler(err);
});

process.on('unhandledRejection', (reason, p) => {
    console.log('Unhandled Rejection at:', p, 'reason:', reason);
    // Application specific logging, throwing an error, or other logic here
});
// ==== ====
app.listen(3500);

function correctCwdWhenDeubug() {
    if (process.cwd() !== '/home/sandor/Documents/cms-tut/app') {
        process.chdir('./app');
    } else {
        console.log('minden fain');
    }
}

