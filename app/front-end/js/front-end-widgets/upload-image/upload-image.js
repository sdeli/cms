module.exports = ((config) => {
    const {
        IMAGES_BASE_URL,
        PROFILE_IMAGE_INPUT_FIELD_SEL,
        POST_METHOD__TERM,
        UPLOAD_IMAGE__EP
    } = config;

    return uploadProfileImage();
    
    function uploadProfileImage() {
        let profileImageInputField = document.querySelector(PROFILE_IMAGE_INPUT_FIELD_SEL);

        profileImageInputField.addEventListener('change', function() {
            let profileImage = profileImageInputField.files[0];

            let reader  = new FileReader();
            reader.readAsDataURL(profileImage)
            reader.onload = function() {
                encodedImage = reader.result;
                let imageDataJson = createImgDataJson(encodedImage)

                sendProfileImageToServer(imageDataJson)
            };
        })
    }
    function createImgDataJson(encodedImage) {
        let imageDetailsArr = encodedImage.split('base64,')

        let extension = imageDetailsArr[0].split('/')[1];
        extension = extension.slice(0, extension.length - 1);

        let imageDataObj = {
                extension,
                body : imageDetailsArr[1]
        }

        return JSON.stringify(imageDataObj); 
    }

    function sendProfileImageToServer(imageDataJson) {
        var xhttp = new XMLHttpRequest();

        xhttp.open(POST_METHOD__TERM, UPLOAD_IMAGE__EP, true);
        xhttp.setRequestHeader("Content-Type", "application/json");

        xhttp.onload = function() {
            let profImageUrl = this.response;
            let noErrorFromServer = profImageUrl.indexOf(IMAGES_BASE_URL) === 0;
            noErrorFromServer &= this.readyState === 4 && this.statusText === 'OK' && noErrorFromServer;
            
            if (noErrorFromServer) {
                updateProfImage(profImageUrl);
            } else {
                alert(this.response);
            }
        }
                
        xhttp.send(imageDataJson);
    }

    function updateProfImage(profImageUrl) {
        extractOldImage()
        appendNewImage(profImageUrl);
    }

    function extractOldImage() {
        let oldImage = profilePictureDiv.children[2]
        profilePictureDiv.removeChild(oldImage); 
    }

    function appendNewImage(profImageUrl) {
        let newImage = document.createElement('img');
        newImage.src = profImageUrl;

        profilePictureDiv.appendChild(newImage);
    }
});

