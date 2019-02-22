const blogNavbar = require('front-end-widgets/blog-navbar');
const Communication = require('front-end-widgets/communication');
const FlashMessage = require('front-end-widgets/flash-message');

FlashMessage.activateCloseBtns();
blogNavbar();
new Communication();