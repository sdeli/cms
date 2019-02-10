const config = require('config');
const FroalaEditor = require('wysiwyg-editor-node-sdk');

const PUBLIC_FOLDER___PATH = config.relativePathes.public.self;

module.exports = removeArticleImage;
    
function removeArticleImage(req, res) {
    req.body.src = `${PUBLIC_FOLDER___PATH}${req.body.src}`;
    FroalaEditor.Image.delete(req.body.src, function(err) {
        if (err) {
            return res.status(404).end(JSON.stringify(err));
        }
        
        return res.end();
    });
}