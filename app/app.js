correctCwdWhenDeubug();

// ==== Set up module linking ====
const path = require('path');
let moduleLinker = require('./widgets/modules-linker/module-linker.js');

let pathToWidgets = `${__dirname}/widgets`;
let pathToFrontEndWidgets = `${__dirname}/front-end/js/front-end-widgets`;
let pathToModels = `${__dirname}/models`;
let pathToConfig = `${__dirname}/config`;
let pathToFrontEndConfig = `${__dirname}/front-end/front-end-config`;
let pathToNodeModules = path.join(`${__dirname}/../node_modules`);

moduleLinker(false, pathToWidgets, pathToNodeModules);
moduleLinker(false, pathToFrontEndWidgets, pathToNodeModules);
moduleLinker(false, pathToModels, pathToNodeModules);
moduleLinker(false, pathToConfig, pathToNodeModules);
moduleLinker(false, pathToFrontEndConfig, pathToNodeModules);

// ==== Npm Third Party Packages ====
const dotenv = require('dotenv');
const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');

// ==== Set Up Environment ====
const config = require('config');
let err = dotenv.config({ path: './.env.default' });
let env = process.env;

// ==== Local Npm Modules ====
const validatior = require('express-validator');
const setUpPassportAuth = require('widgets/set-up-passport-auth');
const flashMessaging = require('widgets/flash-messaging');
let middlewares = require('widgets/middlewares');
let errorHandler = require('widgets/error-handler/error-handler')

// ==== Routers ====
const blogRouter = require('./routers/blog-router/blog-router.js');
const authRouter = require('./routers/auth-router/auth-router.js');
const adminRouter = require('./routers/admin-router/admin-router.js');
const fourOfourPg = require('./routers/404-pg/404-pg.js');

// ==== App Setup ====
let app = express();
app.use(validatior());

app.use(session({
    secret: config.expressSession.salt,
    resave: config.expressSession.resave,
    saveUninitialized: config.expressSession.saveUninitialized
}));

setUpPassportAuth(app);

let staticFilesFolder = path.join(__dirname, config.relativePathes.public.self);
app.use(express.static(staticFilesFolder));
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());

app.use(flashMessaging);    

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(middlewares.keepTrackOfPrevUrl);

app.use(blogRouter);
app.use(authRouter);
app.use(adminRouter);
app.use(fourOfourPg);

// ==== Err Handling ====
app.use(errorHandler);

// ==== ====
app.listen(3500);

function correctCwdWhenDeubug() {
    if (process.cwd() !== '/home/sandor/Documents/cms-tut/app') {
        process.chdir('./app');
    } else {
        console.log('minden fain');
    }
}

