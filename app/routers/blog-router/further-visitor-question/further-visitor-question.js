const config = require('config');
const mailer = require('widgets/mailer');

const QUESTION_SUCCESFULLY_FURTHERED__SUCC_FLASH = config.flashMsgs.furthereUserQuestion.succ;

module.exports = furtherVisitorQuestion;

function furtherVisitorQuestion(req, res, next) {
    let validationErrs = validateFormData(req);
    let isquestionDataCorrect = validationErrs.length === 0;
    
    if (!isquestionDataCorrect) {
        denyFurtheredQuestion(req, res, validationErrs);
        return;
    }

    mailer.sendMail(req.body)
    .then(() => {
        notifAboutFurtheredQuestion(res);
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
        .matches(/^[1-9-\s]+$/).withMessage('A telefonszam mezobe kerjuk csak szamokat irj be, kotojellel vagy szokozzel elvalasztva');
    }

    req.checkBody('question')
    .notEmpty().withMessage('Kérjük adjon meg egy kérdést.')
    .escape();

    validationErrs = req.validationErrors({
        onlyFirstError: true
    });

    var validationErrs = Object.values(validationErrs);
    return validationErrs;
}

function notifAboutFurtheredQuestion(res) {
    let successMsg = QUESTION_SUCCESFULLY_FURTHERED__SUCC_FLASH;

    res.send(successMsg)
}

function denyFurtheredQuestion(req, res, validationErrs) {
    let validationErrMsgs = validationErrs.map(validationErr => validationErr.msg);

    res.status(400).json({validationErrMsgs})
}