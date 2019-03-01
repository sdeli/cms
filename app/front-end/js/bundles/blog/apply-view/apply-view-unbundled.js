const frontEndConf = require('front-end-config');
const blogNavbar = require('front-end-widgets/blog-navbar');
const FlashMessage = require('front-end-widgets/flash-message');

const WINDOW_MOBILE_WIDTH = frontEndConf.general.windowSmallSize;

FlashMessage.activateCloseBtns();
blogNavbar({WINDOW_MOBILE_WIDTH});