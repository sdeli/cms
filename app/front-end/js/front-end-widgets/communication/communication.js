const frontEndConfig = require('front-end-config');

let canFollowWindow = require('./modules/can-follow-window/can-follow-window.js');
let canSendVisitorQuestion = require('./modules/can-send-visitor-question/can-send-visitor-question.js');

const CanFollowWindow = canFollowWindow({
    WINDOW_MEDIUM_SIZE : parseInt(frontEndConfig.general.windowMediumSize)
});

const CanSendVisitorQuestion = canSendVisitorQuestion({
    POST_USER_QUESTION__EP : frontEndConfig.restEndPoints.blog.furtherUserQuestion,
    FALLBACK_ERR_FLASH : frontEndConfig.general.fallbackErr
});


function Communication() {
    let submiteQuestionBtn = $('.communication__form__btn');

    this.COMMUNICATION_MAIN_ELEM__CLASS = 'communication';
    this.FLASH_MSGS_CONTAINER__SEL = '.communication__flash-msgs';
    this.INPUT_NAME__SEL = '.communication__form__input[name=\'name\']';
    this.INPUT_EMAIL__SEL = '.communication__form__input[name=\'email\']';
    this.INPUT_PHONE_NUM__SEL = '.communication__form__input[name=\'phoneNumber\']';
    this.INPUT_USER_QUESTION__SEL = '.communication__form__text-area[name=\'question\']';
    
    CanFollowWindow.call(this);
    CanSendVisitorQuestion.call(this);
    
    Object.assign(Communication.prototype, 
        CanFollowWindow.prototype,
        CanSendVisitorQuestion.prototype,
    );
        
    submiteQuestionBtn.click(() => {
        this.sendVisitorQuestion();
    });
    
    this.followWindow();
}
    
module.exports = Communication;