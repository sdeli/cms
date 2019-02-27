module.exports = ((config) => {
    const {
        ARTICLE_BODY_EDITOR_TEXT_AREA_ID,
        IMAGE_UPLOAD_EP,
        FROALA_IMAGE_REMOVED__EVENT,
        REMOVE_IMAGE__EP,
        IMAGE_DELETED__MSG,
        IMAGE_COULDNT_BE_DELETED__ERR_MSG
    } = config;

    setUpFroalaEditor();

    function setUpFroalaEditor() {
        setUpImageMarginLeftCustomBtn();

        $(ARTICLE_BODY_EDITOR_TEXT_AREA_ID).froalaEditor({
            height: 300,
            imageUploadURL: IMAGE_UPLOAD_EP,
            imageUploadMethod: 'POST',
            toolbarButtons: ['fullscreen', 'bold', 'italic', 'underline', 'strikeThrough', 'subscript', 'superscript', '|', 'fontFamily', 'fontSize', 'color', 'inlineClass', 'inlineStyle', 'paragraphStyle', 'lineHeight', '|', 'paragraphFormat', 'align', 'formatOL', 'formatUL', 'outdent', 'indent', 'quote', '-', 'insertLink', 'insertImage', 'insertVideo', 'embedly', 'insertFile', 'insertTable', '|', 'emoticons', 'fontAwesome', 'specialCharacters', 'insertHR', 'selectAll', 'clearFormatting', '|', 'print', 'getPDF', 'spellChecker', 'help', '|', 'undo', 'redo'],
            imageEditButtons: ['imageReplace', 'imageAlign', 'imageCaption', 'imageRemove', '|', 'imageLink', 'linkOpen', 'linkEdit', 'linkRemove', '-', 'imageDisplay', 'imageStyle', 'setImageMarginLeft', 'imageAlt', 'imageSize', "imageMarginLeftIcon", "imageMarginRightIcon"]
        })
        .on(FROALA_IMAGE_REMOVED__EVENT, function (e, editor, $img) {
            $.ajax({
              method: 'DELETE',
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

function setUpImageMarginLeftCustomBtn() {
    $.FroalaEditor.DefineIcon('setImageMarginLeft', {NAME: 'star'});
    $.FroalaEditor.RegisterCommand('setImageMarginLeft', {
      title: 'setImageMarginLeft',
      focus: false,
      undo: false,
      refreshAfterCallback: false,
      callback: function () {
        var $img = this.image.get();
        $img.toggleClass("image-margin-left");
        if($img.hasClass("image-margin-left")) {
            alert('class left is set');
        } else {
            alert('class left is unset');
        }
      }
    });
/*
    $.FroalaEditor.DefineIcon('imageMarginRightIcon', {NAME: 'info'});
    $.FroalaEditor.RegisterCommand('imageMarginRightIcon', {
        title: 'imageMarginRightIcon',
        focus: true,
        undo: true,
        refreshAfterCallback: false,
        callback: function () {
            var $img = this.image.get();
            $img.toggleClass("image-margin-right");
            if($img.hasClass("image-margin-right")) {
                alert('class right is set');
            } else {
                alert('class right is unset');
            }
        }
    });*/
    
    $.FroalaEditor.DefineIcon('imageMarginRightIcon', {NAME: 'info'});
    $.FroalaEditor.RegisterCommand('imageMarginRightIcon', {
        title: 'imageMarginRightIcon',
        focus: true,
        undo: true,
        refreshAfterCallback: false,
        callback: function () {
            var $img = this.image.get();
            $img.toggleClass("image-margin-right");
            if($img.hasClass("image-margin-right")) {
                alert('class right is set');
            } else {
                alert('class right is unset');
            }
        }
    });
}

/*
$.FroalaEditor.DefineIcon('imageMarginRightIcon', {NAME: 'info'});
    $.FroalaEditor.RegisterCommand('imageMarginRightIcon', {
        title: 'imageMarginRightIcon',
        focus: true,
        undo: true,
        refreshAfterCallback: false,
        callback: function () {
            var $img = this.image.get();
            $img.toggleClass("image-margin-right");
            if($img.hasClass("image-margin-right")) {
                alert('class right is set');
            } else {
                alert('class right is unset');
            }
        }
    });*/