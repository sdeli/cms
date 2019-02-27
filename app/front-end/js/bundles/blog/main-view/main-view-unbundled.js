const frontEndConf = require('front-end-config');
const blogNavbar = require('front-end-widgets/blog-navbar');
const Communication = require('front-end-widgets/communication');
const FlashMessage = require('front-end-widgets/flash-message');
const blockUi = require('front-end-widgets/block-ui');

const WINDOW_MOBILE_WIDTH = frontEndConf.general.windowSmallSize;

FlashMessage.activateCloseBtns();
blogNavbar({WINDOW_MOBILE_WIDTH});
new Communication();
blockUi.init();