module.exports = ((config) => {
    const {
        ARTICLE_BODY_EDITOR_TEXT_AREA_ID,
        IMAGE_UPLOAD_EP,
        AJAX_POST_METHOD__TERM,
        FROALA_IMAGE_REMOVED__EVENT,
        REMOVE_IMAGE__EP,
        IMAGE_DELETED__MSG,
        IMAGE_COULDNT_BE_DELETED__ERR_MSG
    } = config;

    setUpFroalaEditor();

    function setUpFroalaEditor() {
        $(ARTICLE_BODY_EDITOR_TEXT_AREA_ID).froalaEditor({
            height: 300,
            imageUploadURL: IMAGE_UPLOAD_EP,
            imageUploadMethod: AJAX_POST_METHOD__TERM
        })
        .on(FROALA_IMAGE_REMOVED__EVENT, function (e, editor, $img) {
            $.ajax({
              method: AJAX_POST_METHOD__TERM,
              url: REMOVE_IMAGE__EP,
              data: {
                src: $img.attr('src')
              }
            })
            .done (function (data) {
              console.log (IMAGE_DELETED__MSG);
            })
            .fail (function (err) {
              console.log (IMAGE_COULDNT_BE_DELETED__ERR_MSG + JSON.stringify(err));
            })
        });
    }
});