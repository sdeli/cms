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
        cssSrcFile : "./app/front-end/css/blog-apply-view-unbundled.css",
        bundledCssFileName : 'blog-apply-view-bundled.css',
        bundledCssFileDest : './app/public/css/'
    },
    {
        cssSrcFile : "./app/front-end/css/blog-articles-list-view-unbundled.css",
        bundledCssFileName : 'blog-articles-list-view-bundled.css',
        bundledCssFileDest : './app/public/css/'
    },
    {
        cssSrcFile : "./app/front-end/css/blog-article-view-unbundled.css",
        bundledCssFileName : 'blog-article-view-bundled.css',
        bundledCssFileDest : './app/public/css/'
    },
    {
        cssSrcFile : "./app/front-end/css/404-view-unbundled.css",
        bundledCssFileName : '404-view-bundled.css',
        bundledCssFileDest : './app/public/css/'
    },
    {
        cssSrcFile : "./app/front-end/css/blog-hotel-list-view-unbundled.css",
        bundledCssFileName : 'blog-hotel-list-view-bundled.css',
        bundledCssFileDest : './app/public/css/'
    },
    {
        cssSrcFile : "./app/front-end/css/blog-main-view-unbundled.css",
        bundledCssFileName : 'blog-main-view-bundled.css',
        bundledCssFileDest : './app/public/css/'
    }
]

let jsFilesToBundle = [
    {
        jsSrcFile : "./app/front-end/js/bundles/admin/articles-list-view/articles-list-view-unbundled.js",
        bundledJsFileName : 'articles-list-view-bundled.js',
        bundledJsFileDest : './app/public/js/admin'
    },
    {
        jsSrcFile : "./app/front-end/js/bundles/admin/edit-article-category-view/edit-article-category-view-unbundled.js",
        bundledJsFileName : 'edit-article-category-view-bundled.js',
        bundledJsFileDest : './app/public/js/admin'
    },
    {
        jsSrcFile : "./app/front-end/js/bundles/admin/create-article-view/create-article-view-unbundled.js",
        bundledJsFileName : 'create-article-view-bundled.js',
        bundledJsFileDest : './app/public/js/admin'
    },
    {
        jsSrcFile : "./app/front-end/js/bundles/admin/edit-article-view/edit-article-view-unbundled.js",
        bundledJsFileName : 'edit-article-view-bundled.js',
        bundledJsFileDest : './app/public/js/admin'
    },
    {
        jsSrcFile : "./app/front-end/js/bundles/admin/article-categories-list-view/article-categories-list-view-unbundled.js",
        bundledJsFileName : 'article-categories-list-view-bundled.js',
        bundledJsFileDest : './app/public/js/admin'
    },
    {
        jsSrcFile : "./app/front-end/js/bundles/admin/register-user-view/regiter-user-view.js",
        bundledJsFileName : 'regiter-user-view-bundled.js',
        bundledJsFileDest : './app/public/js/admin'
    },
    {
        jsSrcFile : "./app/front-end/js/bundles/admin/manage-users-view/manage-users-view.js",
        bundledJsFileName : 'manage-users-view-bundled.js',
        bundledJsFileDest : './app/public/js/admin'
    },
    {
        jsSrcFile : "./app/front-end/js/bundles/blog/main-view/main-view-unbundled.js",
        bundledJsFileName : 'main-view-bundled.js',
        bundledJsFileDest : './app/public/js/blog'
    },
    {
        jsSrcFile : "./app/front-end/js/bundles/blog/apply-view/apply-view-unbundled.js",
        bundledJsFileName : 'apply-view-bundled.js',
        bundledJsFileDest : './app/public/js/blog'
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