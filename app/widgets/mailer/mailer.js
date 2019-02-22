const config = require('config');
const nodemailer = require('nodemailer');

const SEND_FROM_EMAIL = config.sendEmail.visitorQuestion.from.addr,
    SEND_FROM_EMAIL_PWD = config.sendEmail.visitorQuestion.from.pwd,
    SEND_TO_EMAIL = config.sendEmail.visitorQuestion.to,
    HOST = config.sendEmail.visitorQuestion.host,
    APPS_HOST_NAME = config.general.hostName,
    TEMP_PWD_LOGIN__EP = config.restEndpoints.admin.auth.logInView.replace(/(.*\/)(:\w+\?)/, '$1tmp');

const mailer = (() => {
    const transporter = nodemailer.createTransport({
        host: HOST,
        auth: {
            user: SEND_FROM_EMAIL,
            pass: SEND_FROM_EMAIL_PWD
        }
    })
    
    function send(mailOptions) {
        return new Promise((resolve, reject) => {
            transporter.sendMail(mailOptions, function(err, info){
                try {
                    if (err) {
                        reject(err);
                        console.log(err);
                    } else {
                        resolve();
                        console.log('Email sent: ' + info.response);
                    }
                } catch (err) {
                    reject(err)
                }
            });
        });
    }

    async function sendMail(msgObj) {
        let mailOptions = {
            from: SEND_FROM_EMAIL,
            to: SEND_TO_EMAIL,
            subject: 'question from visitor',
            text: JSON.stringify(msgObj, null, 2)
        };
        
        await send(mailOptions);
    }

    async function sendCredetnialsMail(email, tmpPwd, tmpPwdExpiry) {
        let mailOptions = {
            from: SEND_FROM_EMAIL,
            to: email,
            subject: 'question from visitor',
            text: getCredentialsMailText(email, tmpPwd, tmpPwdExpiry)
        };
        
        await send(mailOptions);
    }

    function getCredentialsMailText(email, tmpPwd, tmpPwdExpiry) {
        let emailsText = ''
            + 'Dear User,\n\n'
            + `Below in the email you recieve the credentials, with you can access the admin area of: ${APPS_HOST_NAME}\n\n`
            + 'When you are logging in please type into the:\n'
            + `email field: ${email}\n`
            + `password field: ${tmpPwd}\n\n`
            + 'The password is a temporary password, which will expire at:\n'
            + `${tmpPwdExpiry}\n\n`
            + 'You can log in and change it, but just with the link below:\n'
            + `${APPS_HOST_NAME}${TEMP_PWD_LOGIN__EP}\n\n` 
            + 'Please do it as soon as it is possible, that your account gets activated and doesnt expire.\n\n'
            + 'Thanks a lot and see you in the admin area';
        
        return emailsText;
    }
    
    return {
        sendMail,
        sendCredetnialsMail
    }
})();

module.exports = mailer