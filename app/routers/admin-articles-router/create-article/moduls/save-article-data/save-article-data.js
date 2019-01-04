const fs = require('fs');
const uniqid = require('uniqid');
const adminModel = require('admin-model').getInst();

function saveArticleData(req) {
    let pageTitle = req.body.pageTitle;
    let teaser = req.body.teasersHtml;
    let articleName = req.body.articleName;
    let articleNameInUrl = req.body.articleName.normalize('NFD').toLowerCase().replace(/[\u0300-\u036f]/g, "");
    let articleBody = req.body.articleHtml;
    let id = uniqid();

    return Promise.all([
        saveArticleBody(articleName, articleBody, id),
        saveTeaser(teaser, id),
    ]).then((results) => {
        let articleData = {
            id, 
            articleName,
            articleNameInUrl,
            pageTitle,
            articleFileName : results[0],
            teaserFileName : results[1]
        }
    
        return adminModel.insertArticleData(articleData);    
    });
}

function saveArticleBody(articleName, articleBody, id) {
    let articlesPath = process.env.ARTICLES_PATH;
    articleName = `${articleName.replace(/\s+/gi, '_').toLocaleLowerCase()}-${id}`;
    let articleFilePath = `${articlesPath}/${articleName}`;

    return new Promise((resolve, reject) => {
        fs.writeFile(articleFilePath, articleBody, (err) => {
            if (err) reject(err);
            resolve(articleName);
        });
    });
}

function saveTeaser(teaser, id) {
    let teasersFolderPath = process.env.TEASERS_PATH;
    let teaserName = `teaser-${id}`;
    let teaserFilePath = `${teasersFolderPath}/${teaserName}`;
    
    return new Promise((resolve, reject) => {
        fs.writeFile(teaserFilePath, teaser, (err) => {
            if (err) reject(err);
            resolve(teaserName)
        });
    });
}

module.exports = saveArticleData;