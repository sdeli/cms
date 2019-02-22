// npm i -S gulp-postcss autoprefixer postcss-simple-vars postcss-nested postcss-mixins postcss-import postcss-hexrgba gulp-rename vinyl-source-stream gulp
const gulpPostcss = require("gulp-postcss"),
	  autoprefixer = require("autoprefixer"),
	  postcssSimpleVars = require("postcss-simple-vars"),
	  postcssNested = require("postcss-nested"), 
	  postcssMixins = require("postcss-mixins"),
	  postcssImport = require("postcss-import"),
	  hexRgba = require("postcss-hexrgba"),
	  rename = require("gulp-rename"),
      source = require('vinyl-source-stream'),
      browserify = require('browserify'),
      envify = require('envify/custom'),
	  gulp = require('gulp');

let cssFilesToBundleArr = [
    {
        cssSrcFile : "./app/front-end/css/home-view-unbundled.css",
        bundledCssFileName : 'home-view-bundled.css',
        bundledCssFileDest : './app/public/css/'
    },
    {
        cssSrcFile : "./app/front-end/css/articles-list-view-unbundled.css",
        bundledCssFileName : 'articles-list-view-bundled.css',
        bundledCssFileDest : './app/public/css/'
    },
    {
        cssSrcFile : "./app/front-end/css/article-view-unbundled.css",
        bundledCssFileName : 'article-view-bundled.css',
        bundledCssFileDest : './app/public/css/'
    },
    {
        cssSrcFile : "./app/front-end/css/contact-page-unbundled.css",
        bundledCssFileName : 'contact-view-bundled.css',
        bundledCssFileDest : './app/public/css/'
    },
    {
        cssSrcFile : "./app/front-end/css/404-view-unbundled.css",
        bundledCssFileName : '404-view-bundled.css',
        bundledCssFileDest : './app/public/css/'
    },
    {
        cssSrcFile : "./app/front-end/css/apply-view-unbundled.css",
        bundledCssFileName : 'apply-view-bundled.css',
        bundledCssFileDest : './app/public/css/'
    },
    {
        cssSrcFile : "./app/front-end/css/hotel-list-view-unbundled.css",
        bundledCssFileName : 'hotel-list-view-bundled.css',
        bundledCssFileDest : './app/public/css/'
    }
]

let jsFilesToBundle = [
    {
        jsSrcFile : "./app/front-end/js/bundles/articles-list-view/articles-list-view-unbundled.js",
        bundledJsFileName : 'articles-list-view-bundled.js',
        bundledJsFileDest : './app/public/js/'
    },
    {
        jsSrcFile : "./app/front-end/js/bundles/create-edit-article-view/create-edit-article-view-unbundled.js",
        bundledJsFileName : 'create-edit-article-view-bundled.js',
        bundledJsFileDest : './app/public/js/'
    },
    {
        jsSrcFile : "./app/front-end/js/bundles/article-categories-list-view/article-categories-list-view-unbundled.js",
        bundledJsFileName : 'article-categories-list-view-bundled.js',
        bundledJsFileDest : './app/public/js/'
    },
    {
        jsSrcFile : "./app/front-end/js/bundles/register-user-view/regiter-user-view.js",
        bundledJsFileName : 'regiter-user-view-bundled.js',
        bundledJsFileDest : './app/public/js/'
    },
    {
        jsSrcFile : "./app/front-end/js/bundles/home-view/home-view-unbundled.js",
        bundledJsFileName : 'home-view-bundled.js',
        bundledJsFileDest : './app/public/js/'
    },
    {
        jsSrcFile : "./app/front-end/js/bundles/apply-view/apply-view-unbundled.js",
        bundledJsFileName : 'apply-view-bundled.js',
        bundledJsFileDest : './app/public/js/'
    }
];

let bundleCssI = 0,
    bundleJsI = 0;
    
gulp.task('default', () => {
    cssFilesToBundleArr.forEach((fileForPageObj, i) => {
        bundleCss(fileForPageObj); 
    });

    jsFilesToBundle.forEach((fileForPageObj, i) => {
        bundleJs(fileForPageObj); 
    });

    gulp.watch('./app/front-end/css/**/**/*.css', function() {
        bundleCssI++;
        console.log('bundle-css cycles: ' + bundleCssI);
        
        cssFilesToBundleArr.forEach((fileForPageObj, i) => {
            bundleCss(fileForPageObj); 
        });
    });

    gulp.watch('./app/front-end/js/**/**/**/*.js', function() {
        bundleJsI++;
        console.log('bundle-js cycles: ' + bundleJsI);
        
        jsFilesToBundle.forEach((fileForPageObj, i) => {
            bundleJs(fileForPageObj); 
        }); 
    });
});


function bundleCss(fileForPageObj){
    let {cssSrcFile, bundledCssFileName, bundledCssFileDest} = fileForPageObj;
    console.log(bundledCssFileName);

    return gulp.src(cssSrcFile)
    .pipe(gulpPostcss([
        postcssImport,
        autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }),
        postcssMixins, 
        postcssSimpleVars,
        hexRgba,
        postcssNested
    ]))
    .on('error', function(errorInfo){
        console.log( errorInfo.toString())
        this.emit('end');
    })
    .pipe(rename(bundledCssFileName))
    .pipe(gulp.dest(bundledCssFileDest))
}

function bundleJs(fileForPageObj) {
    let {jsSrcFile, bundledJsFileName, bundledJsFileDest} = fileForPageObj;

    return browserify(jsSrcFile)
    .transform(envify(process.env))
    .bundle()
        .on('error', function(errorInfo){
   		    console.log( errorInfo.toString() )
   		    this.emit('end');
        })
        .pipe(source(bundledJsFileName))
        .pipe(gulp.dest(bundledJsFileDest));
}