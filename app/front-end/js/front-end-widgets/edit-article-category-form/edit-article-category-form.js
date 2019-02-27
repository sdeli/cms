let {sendPUTFormRequest} = require('front-end-widgets/utils');

module.exports = ((config) => {
    const {
        UPDATE_ARTICLE__EP,
        FLASH_MSGS_DIV__SEL
    } = config;
    
    const submitButton = $('[type="submit"]');
    const currArticleCategoryNameInput = document.querySelector(`[name="currArticleCategoryName"]`);
    const articleCategInput = document.querySelector(`[name="articleCategory"]`);

    sendPUTFormRequest = sendPUTFormRequest({
        UPDATE_ARTICLE__EP,
        FLASH_MSGS_DIV__SEL,
        CONTENT_TYPE : 'application/json'
    })
    
    editArticleCategForm()
    
    function editArticleCategForm() {
        submitButton.on('click', function(e) {
            e.preventDefault();
            
            let editArticleCategFormDataJson = getFormdataJson();
            sendPUTFormRequest(editArticleCategFormDataJson);
        });
    }

    function getFormdataJson() {
        let editArticleCategFormData = {};
        editArticleCategFormData[articleCategInput.name] = articleCategInput.value;
        editArticleCategFormData[currArticleCategoryNameInput.name] = currArticleCategoryNameInput.value;

        let editArticleCategFormDataJson = JSON.stringify(editArticleCategFormData);
        return editArticleCategFormDataJson;
    }
});