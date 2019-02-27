const FlashMessage = require('front-end-widgets/bootstrap-flash-message');
let {sendPUTFormRequest} = require('front-end-widgets/utils');

module.exports = ((config) => {
    const {
        UPDATE_ARTICLE__EP,
        FALLBACK_ERR_FLASH,
        FLASH_MSGS_DIV__SEL
    } = config

    const submitButton = $('[type="submit"]');
    const pageTitleInput = document.querySelector('[name="pageTitle"]');
    const articleIdInput = document.querySelector('[name="articleId"]');
    const articleNameInput = document.querySelector('[name="articleName"]');
    const CHECK_BOXES_NAME_ATTR = 'articleCategories[]';
    const selectedArticleCategsCheckboxes = $(`[name="${CHECK_BOXES_NAME_ATTR}"]:checked`);
    const teasersHtmlTextArea = document.querySelector('[name="teasersHtml"]');
    const articleBodyTextArea = document.querySelector('[name="articleHtml"]');
    const squareArticleProfileImgInput = document.querySelector('[name="squareArticleProfileImg"]');
    const flatArticleProfileImgInput = document.querySelector('[name="flatArticleProfileImg"]');

    sendPUTFormRequest = sendPUTFormRequest({
        UPDATE_ARTICLE__EP,
        FLASH_MSGS_DIV__SEL,
    })

    return updateArticleData();

    function updateArticleData() {
        submitButton.on('click', function(e) {
            e.preventDefault();

            let editArticleFormData = getFormData();
            sendPUTFormRequest(editArticleFormData);
            // sendUpdateArticleRequest(editArticleFormData);
        });
    }

    function getFormData() {
        var formData = new FormData();

        formData.append(articleIdInput.name, articleIdInput.value);
        formData.append(pageTitleInput.name, pageTitleInput.value);
        formData.append(articleNameInput.name, articleNameInput.value);
        formData.append(teasersHtmlTextArea.name, teasersHtmlTextArea.value);
        formData.append(articleBodyTextArea.name, articleBodyTextArea.value);
        
        selectedArticleCategsCheckboxes.each((i, checkBox) => {
            checkBox.value
            formData.append(CHECK_BOXES_NAME_ATTR, checkBox.value);
        });

        let hasNewSquareArticleProfileImg = squareArticleProfileImgInput.files.length > 0;
        if (hasNewSquareArticleProfileImg) {
            let fieldName = squareArticleProfileImgInput.name
            formData.append(fieldName, squareArticleProfileImgInput.files[0]);
        }

        let hasNewFlatArticleProfileImg = flatArticleProfileImgInput.files.length > 0;
        if (hasNewFlatArticleProfileImg) {
            fieldName = flatArticleProfileImgInput.name
            formData.append(fieldName, flatArticleProfileImgInput.files[0]);
        }

        return formData;
    }

    function sendUpdateArticleRequest(editArticleFormData) {
        $.ajax(UPDATE_ARTICLE__EP, {
            type : "PUT",
            data: editArticleFormData,
            contentType: false,
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
});
