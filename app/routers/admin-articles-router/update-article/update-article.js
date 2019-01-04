const fs = require('fs');
const adminModel = require('admin-model').getInst();

const {updateFile, renameFile} = require('server-utils');

module.exports = ((config) => {
    // create closure for config constants
    const {
        TEASERS_PATH, 
        ARTICLES_PATH, 
        EDIT_ARTICLE__VIEW, 
        EDIT_ARTICLE_VIEW__ID, 
        EDIT_ARTICLE_VIEW__TITLE, 
        UPDATE_ARTICLE__EP,
        UPDATE_ARTICLE__SUCC_FLASH, 
        UPDATE_ARTICLE__ERR_FLASH, 
    } = config;

    // route start
    return updateArticle;
    
    function updateArticle(req, res) {
        let articleNameInUrl = req.body.articleName.normalize('NFD').toLowerCase().replace(/[\u0300-\u036f]/g, "");

        let newArticleDetails = {
            articleId : req.body.articleId, 
            articleName : req.body.articleName,
            articleNameInUrl,
            pageTitle : req.body.pageTitle,
            articleFileName : `${articleNameInUrl.replace(/\s/gi ,'_')}-${req.body.articleId}`,
            teasersHtml : req.body.teasersHtml,
            articleHtml : req.body.articleHtml
        }

        adminModel.updateArticleData(newArticleDetails)
        .then((updatedArticleDataFromDb) => {
            return updateFilesOfArticle({
                currArticleFileName : updatedArticleDataFromDb.oldArticleFileName, 
                newArticleFileName : updatedArticleDataFromDb.newArticleFileName, 
                newArticleBody : newArticleDetails.articleHtml,
                teaserFileName : updatedArticleDataFromDb.teaserFileName,
                newTeaser : newArticleDetails.teasersHtml
            });
        })
        .then(() => {
            redirect('success', res, newArticleDetails);
        })
        .catch(e => {
            process.emit(WARNING_EVENT, e.stack, req);
            redirect('deny', res, newArticleDetails);
        });
    }
    
    function updateFilesOfArticle(updateParams) {
        let {currArticleFileName, newArticleFileName, newArticleBody, teaserFileName, newTeaser} = updateParams;

        newArticleFilePath = `${ARTICLES_PATH}/${newArticleFileName}`;
        currArticleFilePath = `${ARTICLES_PATH}/${currArticleFileName}`;
        teaserFilePath = `${TEASERS_PATH}/${teaserFileName}`;
    
        return Promise.all([
            updateFile(currArticleFilePath, newArticleBody),
            updateFile(teaserFilePath, newTeaser)
        ])
        .then(() => {
            renameFile(currArticleFilePath, newArticleFilePath)
        })
    }
    
    function redirect(type, res, articleData) {
        if (type === 'success') {
            res.flash.toCurr(res.flash.SUCCESS, UPDATE_ARTICLE__SUCC_FLASH);
        } else if ('deny') {
            res.flash.toCurr(res.flash.WARNING, UPDATE_ARTICLE__ERR_FLASH);
        }

        res.render(EDIT_ARTICLE__VIEW, {
            pageTitle : `${EDIT_ARTICLE_VIEW__TITLE} ${articleData.articleName}`,
            pageId : EDIT_ARTICLE_VIEW__ID,
            postDataToRoute : UPDATE_ARTICLE__EP,
            articleData
        });
    } 
});