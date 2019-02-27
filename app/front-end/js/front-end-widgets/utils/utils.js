const frontEndConfig = require('front-end-config');
const FlashMessage = require('front-end-widgets/bootstrap-flash-message');

const FALLBACK_ERR_FLASH = frontEndConfig.general.fallbackErr;

function getUniqueStr(randStrLength) {
	var randStr = "";
	var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
 
	for (var i = 0; i < randStrLength; i++)
	  randStr += possible.charAt(Math.floor(Math.random() * possible.length));
 
	return randStr;
}

function alertOnClick(config, cb) {
	const {alertMsg} = config;

	return (e) => {
		e.preventDefault();
	
		if(confirm(alertMsg)) {
			cb(e)
		}
	}
}

function sendDeleteRequestOnEvent(config) {
	const {FLASH_MSGS_DIV__SEL} = config;

	return (e) => {
		e.preventDefault(); 
	
		let deleteEp = e.target.getAttribute('data-href');
	
		$.ajax(deleteEp, {
			type : "DELETE"
		})
		.done(redirectEp => {
			window.location.replace(redirectEp);
		})
		.fail(() => {
			let flash = new FlashMessage(FlashMessage.ALERT, FALLBACK_ERR_FLASH)
			flash.display(FLASH_MSGS_DIV__SEL);
		});
	}
}

function sendPUTFormRequest(config) {
	const {
		UPDATE_ARTICLE__EP,
		FLASH_MSGS_DIV__SEL,
		CONTENT_TYPE
	} = config;

	return (formdata) => {
		$.ajax(UPDATE_ARTICLE__EP, {
			type : "PUT",
			data: formdata,
			contentType: CONTENT_TYPE || false,
			processData: false,
		})
		.done(redirectEp => {
			window.location.replace(redirectEp);
		})
		.fail(() => {
			let flash = new FlashMessage(FlashMessage.ALERT, FALLBACK_ERR_FLASH)
			flash.display(FLASH_MSGS_DIV__SEL);
		});
	}
}

module.exports = {
	getUniqueStr,
	alertOnClick,
	sendDeleteRequestOnEvent,
	sendPUTFormRequest
};