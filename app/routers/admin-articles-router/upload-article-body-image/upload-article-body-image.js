const articlesModel = require('articles-model').getInst();
var FroalaEditor = require('wysiwyg-editor-node-sdk');

module.exports = ((config) => {
    const {
        ARTICLE_BODY_IMG_FOLDER___PATH,
        PUBLIC_FOLDERS__NAME
    } = config;

    return uploadArticleImage;
    
    function uploadArticleImage(req, res) {
        FroalaEditor.Image.upload(req, ARTICLE_BODY_IMG_FOLDER___PATH, function(err, data) {
            if (err) {
                return res.send(JSON.stringify(err));
            }
            data.link = data.link.replace(`/${PUBLIC_FOLDERS__NAME}`, '')
            res.send(data);
        });
    }
});