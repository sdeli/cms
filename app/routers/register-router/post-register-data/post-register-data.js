const passwordTestRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.{8,})(?=.*[!#$%()*+,-.:;=?@[\]^_`\{|\}~]).*$/
const passwordTestErrMsg = 'Your password should be at least 9 characters long, contain at least one uppercase letter and at least one lowercase letter and one number, furthermore one from the following characters: !"#$%&\'()*+,-./:;<=>?@[\]^_`{|}~';
const bcrypt = require('bcryptjs');
const env = process.env;

function postRegisterData(req, res){
    let validationErrs = validateRegisterFormData(req);
    let signUpDataCorrect = validationErrs.length === 0;

    if (signUpDataCorrect) {
        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(req.body.password, salt);
        var isTrue = bcrypt.compareSync("Bgfkszm1234_", hash); // true
        var isTrue2 = bcrypt.compareSync("not_bacon", hash);
        req.session.password = req.body.password;
        res.render(env.REGISTER__VIEW);
    } else {
        res.render(env.REGISTER__VIEW, {
            messages : validationErrs
        });
    }
}

function validateRegisterFormData(req) {
    req.checkBody('name')
    .notEmpty().withMessage('please enter a name')
    .len(4,15).withMessage('The Name should be between 4 and 15 characters')
    .trim().escape();

    req.checkBody('email')
    .notEmpty().withMessage('please enter an email')
    .len(5,100).withMessage('The length of your email should be between 5 and 100')
    .isEmail().withMessage('The email you entered is invalid, please try it again')
    .normalizeEmail();

    req.checkBody('password')
    .matches(passwordTestRegex).withMessage(passwordTestErrMsg)
    .escape();

    req.checkBody('passwordConf')
    .notEmpty().withMessage('please enter an password')
    .equals(req.body.passwordConf).withMessage('The Password confirmation doesnt match your password')
    .escape();

    validationErrs = req.validationErrors({
        onlyFirstError: true
    });

    var validationErrs = Object.values(validationErrs);
    return validationErrs;
}

module.exports = postRegisterData;

/*
$doesContNumb = (bool)preg_match("#[0-9]+#",$password);
        $doesContCapLetter =  (bool)preg_match("#[A-Z]+#",$password);
        $doesContLowCaseLetter = (bool)preg_match("#[a-z]+#",$password);
*/