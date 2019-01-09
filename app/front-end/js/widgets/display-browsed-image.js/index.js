
module.exports = ((config) => {
    const {
        IMAGE_PREVIEW_ELEM__SEL,
        BROWSE_BTN__SEL,
        DISPLAYED_IMG__HEIGHT
    } = config;
    
    const IMAGE_BROWSE_BTN = $(BROWSE_BTN__SEL);
    const PREVIEW_ELEM = $(IMAGE_PREVIEW_ELEM__SEL);

    displayBrowsedImage();

    function displayBrowsedImage() {
        IMAGE_BROWSE_BTN.on('change', function() {
            let imageToDisplay = IMAGE_BROWSE_BTN.prop('files')[0];

            let isFileAnImage = imageToDisplay.type.startsWith('image/');
            if (isFileAnImage) {
                removePrevDisplayedImg();
                displayImage(imageToDisplay)
            } else {

            };

        });
    }

    function removePrevDisplayedImg() {
        PREVIEW_ELEM.empty();
    }
    
    function displayImage(imageToDisplay) {
        const img = document.createElement("img");
        img.classList.add("obj");
        img.file = imageToDisplay;
        img.setAttribute('height', DISPLAYED_IMG__HEIGHT);
        PREVIEW_ELEM.append(img);

        let reader  = new FileReader();
        reader.onload = (function(aImg) { 
            return function(e) { 
                aImg.src = e.target.result; 
            }; 
        })(img);
    
        reader.readAsDataURL(imageToDisplay);
    };
});