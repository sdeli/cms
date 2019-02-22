const config = require('config');
const FroalaEditor = require('wysiwyg-editor-node-sdk');

const ARTICLE_BODY_IMG_FOLDER___PATH = config.relativePathes.public.img.article.body + '/',
    PUBLIC_FOLDERS__NAME = config.general.publicFoldersName;

module.exports = uploadArticleImage;
    
function uploadArticleImage(req, res) {
    FroalaEditor.Image.upload(req, ARTICLE_BODY_IMG_FOLDER___PATH, function(err, data) {
        if (err) {
            return res.send(JSON.stringify(err));
        }
        data.link = data.link.replace(`./${PUBLIC_FOLDERS__NAME}`, '')
        res.json(data);
    });
}