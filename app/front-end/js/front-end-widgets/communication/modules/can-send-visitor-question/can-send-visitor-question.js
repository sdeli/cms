const FlashMessage = require('front-end-widgets/flash-message');

module.exports = ((config) => {
    const {
        FALLBACK_ERR_FLASH,
        POST_USER_QUESTION__EP
    } = config;

    return function CanSendVisitorQuestion() {
        const that = this;

        CanSendVisitorQuestion.prototype.sendVisitorQuestion = function() {
            let questionDataJson = collectQuestionData()
            postQuestionData(questionDataJson)
        }
        
        function postQuestionData(questionDataJson) {
            $.ajax(POST_USER_QUESTION__EP, {
                data : questionDataJson,
                contentType : 'application/json',
                type : 'POST'
            }).done(succMsg => {
                displayMessage(FlashMessage.SUCCESS, succMsg);
                wipeInputFields();
            }).fail(res => {
                if (res.responseJSON.validationErrMsgs) {
                    let {validationErrMsgs} = res.responseJSON
                    displayMessage(FlashMessage.ALERT, validationErrMsgs);
                } else {
                    displayMessage(FlashMessage.ALERT, FALLBACK_ERR_FLASH);
                }
                return;
            });
        }
        
        function collectQuestionData() {
            let questionDataJson = JSON.stringify({
                fullName : $(that.INPUT_NAME__SEL).val(),
                email : $(that.INPUT_EMAIL__SEL).val(),
                phoneNumb : $(that.INPUT_PHONE_NUM__SEL).val(),
                question : $(that.INPUT_USER_QUESTION__SEL).val(),
            });
    
            return questionDataJson
        }

        function displayMessage(type, msgs) {
            if (Array.isArray(msgs)) {
                msgs.forEach(msg => {
                    let flashMessage = new FlashMessage(type, msg, that.FLASH_MSGS_CONTAINER__SEL);
                    flashMessage.displayMessage();
                })
            } else {
                let flashMessage = new FlashMessage(type, msgs, that.FLASH_MSGS_CONTAINER__SEL);
                flashMessage.displayMessage();
            }
        }

        function wipeInputFields() {
            $(that.INPUT_NAME__SEL).val('');
            $(that.INPUT_EMAIL__SEL).val('');
            $(that.INPUT_PHONE_NUM__SEL).val('');
            $(that.INPUT_USER_QUESTION__SEL).val('');
        }
    }
});