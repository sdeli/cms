const userModel = require('models/user-model');
const bcrypt = require('bcryptjs');

module.exports = handleLocalLogin;

function handleLocalLogin(email, currPwd, done) {
    userModel.getUserByEmail(email)
    .then(userObj => {
        if (!userObj) return done(null, false);

        if(checkIfPwdCorrect(currPwd, userObj.passwordHash)) {
            done(null, userObj);
        } else {
            done(null, false);
        }
    })
    .catch(err => done(err))
}

function checkIfPwdCorrect(currPwd, pwdHasFromDb) {
    var isTrue = bcrypt.compareSync(currPwd, pwdHasFromDb);

    return isTrue;
}