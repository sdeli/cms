const config = require('config');

const INDEX_VIEW__PATH = config.viewPathes.blog.index, 
    INDEX_VIEW__TITLE = config.templateConf.blog.index.title, 
    INDEX_VIEW__ID = config.templateConf.blog.index.id;

module.exports = getAdminIndexView;

function getAdminIndexView(req, res){
    res.render(INDEX_VIEW__PATH, {
        pageTitle : INDEX_VIEW__TITLE,
        pageId : INDEX_VIEW__ID
    });
}