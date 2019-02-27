const config = require('config');
const mailer = require('widgets/mailer');

const APPLICATION_SUCCESFULLY_FURTHERED__SUCC_FLASH = config.flashMsgs.furtherApplication.succ,
    GET_APPLY_VIEW__EP = config.restEndpoints.blog.apply;

module.exports = furtherApplication;

function furtherApplication(req, res, next) {
    let validationErrs = validateFormData(req);
    let isApplicationDataCorrect = validationErrs.length === 0;
    
    if (!isApplicationDataCorrect) {
        denyFurtherOfApplication(req, res, validationErrs);
        return;
    }

    mailer.sendMail(req.body)
    .then(() => {
        sendApplicationConfirmationEmail(req);
        notifyAboutSuccApplication(res);
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

    req.checkBody('email')
    .notEmpty().withMessage('kerjuk adja meg az emailcimet')
    .len(5,100).withMessage('Az email-cimenek legalabb 5 betut kell tartalmaznia es maximum 100 karakter hosszu lehet')
    .isEmail().withMessage('Az megadott emailcim nem megfelelo, kerjuk usson be egy ervenyes emailcimet');

    req.checkBody('fullName')
    .notEmpty().withMessage('Kerjuk adja meg a teljes nevet')
    .matches(/^[a-zA-Z\s]+$/).withMessage('A nev mezo csak betuket tartalmazhat es szokozt tartalmazhat');

    let hasUserGivenPhoneNumb = req.body.phoneNumb.length > 0;
    if (hasUserGivenPhoneNumb) {
        req.checkBody('phoneNumb')
        .isNumeric().withMessage('A megadott telefonszam sajnos nem ervenyes. Kerjuk adjon meg egy ervenyes telefonszamot');
    }

    req.checkBody('languageSkills')
    .notEmpty().withMessage('Kérjük adja meg nyelvtudasanak a szintjet.')
    .escape();

    req.checkBody('question')
    .escape();

    validationErrs = req.validationErrors({
        onlyFirstError: true
    });

    var validationErrs = Object.values(validationErrs);
    return validationErrs;
}

function denyFurtherOfApplication(req, res, validationErrs) {
    validationErrs.forEach(validationErr => {
        res.flash.toNext(res.flash.WARNING, validationErr.msg);
    });
    
    req.session.body = req.body;
    res.redirect(GET_APPLY_VIEW__EP);
}

function sendApplicationConfirmationEmail(req) {
    mailer.sendApplConfMail({
        RecipientName : req.body.fullName,
        to : req.body.email,
    });
}

function notifyAboutSuccApplication(res) {
    let successMsg = APPLICATION_SUCCESFULLY_FURTHERED__SUCC_FLASH;
    res.flash.toNext(res.flash.SUCCESS, successMsg);

    res.redirect(GET_APPLY_VIEW__EP);
}
