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
var MySQLStore = require('express-mysql-session')(session);

// ==== Set Up Environment ====
const config = require('config');
let err = dotenv.config({ path: './.env.default' });

// ==== Local Npm Modules ====
const validatior = require('express-validator');
const setUpPassportAuth = require('widgets/set-up-passport-auth');
const flashMessaging = require('widgets/flash-messaging');
let middlewares = require('widgets/middlewares');
let errorHandler = require('widgets/error-handler/error-handler')

// ==== Constants ====
const FOUR_O_FOUR__ID = config.templateConf.fourOFour.id;
const FOUR_O_FOUR__EP = config.restEndpoints.error.replace(/(.*\/)(:\w+)/, `$1${FOUR_O_FOUR__ID}`);

// ==== Routers ====
const blogRouter = require('./routers/blog-router/blog-router.js');
const adminRouter = require('./routers/admin-router/admin-router.js');
const errorRouter = require('./routers/error-router/error-router.js');

// ==== App Setup ====
let app = express();
app.use(validatior());

var options = {
    host: process.env.DB_HOST,
    port: 3306,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    clearExpired: true,
};

var sessionStore = new MySQLStore(options);

app.use(session({
    secret: config.expressSession.salt,
    resave: config.expressSession.resave,
    cookie: { path: '/', httpOnly: true, secure: false, maxAge: null },
    store: sessionStore,
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
app.get("/as", function (req, res) {
    throw new Error("BROKEN"); // Express will catch this on its own.
});

app.use(blogRouter);
app.use(adminRouter);
app.use(errorRouter);
app.use((req, res) => {
    console.log(req.url);
    if (req.method === "GET" || req.method === "POST") {
        res.redirect(FOUR_O_FOUR__EP);
    } else {
        // node.js redirect doesnt change the method from DELETE and from PUT to GET. thatswhy if the initial request was put or delete and it gets redirected, then the redirect request will be the same DELTE or PUT and so express wont find the route where it has been redirected. Here I would redirect to /error/404 but due to that is a GET route it wont be found and the request would loop inot here again and again. So I use DELETE OR PUT requests just in ajax and just send the error redirects ep where on the front end will be redirected /error/404.
        res.send(FOUR_O_FOUR__EP);
    }
});

// ==== Err Handling ====
app.use(errorHandler);

app.listen(3500);

function correctCwdWhenDeubug() {
    if (process.cwd() !== '/home/sandor/Documents/cms-tut/app') {
        process.chdir('./app');
    } else {
        console.log('minden fain');
    }
}

