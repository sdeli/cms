const config = require('front-end-config');
const displayBrowsedImage = require('front-end-widgets/display-browsed-image');

displayBrowsedImage({
    IMAGE_PREVIEW_ELEM__SEL : config.bundles.registerUser.imagePreviewElemSel,
    BROWSE_BTN__SEL : config.bundles.registerUser.imageBrowseBtnSel,
    DISPLAYED_IMG__HEIGHT : config.bundles.registerUser.displayedImgesHeight
});