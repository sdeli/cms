const config = require('config');
const {deleteFile} = require('widgets/server-utils');

let saveArticleData = require('./moduls/save-article-data/save-article-data.js');

const VIEW_TITLE_NOT_EMPTY__ERR_FLASH = config.flashMsgs.validationErr.viewTitle.notEmpty,
    VIEW_TITLE_CHAR_COUNT__ERR_FLASH = config.flashMsgs.validationErr.viewTitle.charCount, 
    ARTICLE_NAME_NOT_EMPTY__ERR_FLASH = config.flashMsgs.validationErr.articleName.notEmpty, 
    ARTICLE_NOT_EMPTY__ERR_FLASH = config.flashMsgs.validationErr.article.notEmpty, 
    ARTICLE_PUBLISHED__SUCC_FLASH = config.flashMsgs.admin.article.create.succ,
    EMAIL_CHAR_COUNT__ERR_FLASH = config.flashMsgs.validationErr.email.charCount,
    TEASER_NOT_EMPTY__ERR_FLASH = config.flashMsgs.validationErr.teaser.notEmpty,
    CREATE_EDIT_ARTICLE_VIEW__EP = config.restEndpoints.admin.article.createView, 
    ARTICLES_LIST__EP = config.restEndpoints.admin.article.ListView,
    ARTICLES__PATH = config.relativePathes.articlesPath,
    TEASERS__PATH = config.relativePathes.teasersPath,
    ARTICLE_PROFILE_IMAGES__PATH = config.relativePathes.public.img.article.profile;

saveArticleData = saveArticleData({
    ARTICLES__PATH,
    TEASERS__PATH,
});

module.exports = createArticle;

async function createArticle(req, res, next) {
    let validationErrs = validateFormData(req);
    let articleDataCorrect = validationErrs.length === 0;
    
    if (!articleDataCorrect) {
        await denyPublishArticle(req, res, validationErrs, next);
        return;
    }

    saveArticleData(req)
    .then(() => {
        notifAboutPublishedArticle(res);
    }).catch(e => {
        next(e);
    });
}

function validateFormData(req) {
    let isArticleProfileImageSentByCurrReq = Boolean(req.file);
    if (isArticleProfileImageSentByCurrReq) {
        req.body.articleProfImgfileName = req.file.filename;
    } else {
        req.body.articleProfImgfileName = null;
    }

    req.checkBody('pageTitle')
    .notEmpty().withMessage(VIEW_TITLE_NOT_EMPTY__ERR_FLASH)
    .len(1, 70)
    .withMessage(VIEW_TITLE_CHAR_COUNT__ERR_FLASH)
    .trim();

    req.checkBody('articleName')
    .notEmpty().withMessage(ARTICLE_NAME_NOT_EMPTY__ERR_FLASH)
    .len(4, 70).withMessage(EMAIL_CHAR_COUNT__ERR_FLASH);

    req.checkBody('teasersHtml')
    .notEmpty().withMessage(TEASER_NOT_EMPTY__ERR_FLASH);

    req.checkBody('articleCategories')
    .isLength({ min: 1 }).withMessage("There should be at least one article category checked");
    
    req.checkBody('articleHtml')
    .notEmpty().withMessage(ARTICLE_NOT_EMPTY__ERR_FLASH);

    validationErrs = req.validationErrors({
        onlyFirstError: true
    });

    var validationErrs = Object.values(validationErrs);
    return validationErrs;
}

function deleteUploadedProfImages(req) {
    let deleteImagesProms = [];

    let uploadedSquareProfImg = Boolean(req.files) && Boolean(req.files.squareArticleProfileImg);
    if (uploadedSquareProfImg) {
        let imgFileName = req.files.squareArticleProfileImg[0].filename;
        deleteImagesProms.push(deleteFile(`${ARTICLE_PROFILE_IMAGES__PATH}/${imgFileName}`))
    }
    
    let uploadedFlatProfImg = Boolean(req.files) && Boolean(req.files.flatArticleProfileImg);
    if (uploadedFlatProfImg) {
        let imgFileName = req.files.flatArticleProfileImg[0].filename;
        deleteImagesProms.push(deleteFile(`${ARTICLE_PROFILE_IMAGES__PATH}/${imgFileName}`))
    }

    return Promise.all(deleteImagesProms);
}

async function denyPublishArticle(req, res, validationErrs, next) {
    try {
        await deleteUploadedProfImages(req)
    } catch (err) {
        next(err)
    }
    
    validationErrs.forEach(validationErr => {
        res.flash.toNext(res.flash.WARNING, validationErr.msg);
    });
    
    req.session.body = req.body;
    res.redirect(CREATE_EDIT_ARTICLE_VIEW__EP);
}

function notifAboutPublishedArticle(res) {
    let successMsg = ARTICLE_PUBLISHED__SUCC_FLASH;
    res.flash.toNext(res.flash.SUCCESS, successMsg);

    res.redirect(ARTICLES_LIST__EP);
}
