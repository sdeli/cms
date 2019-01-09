const {updateFile, renameFile, deleteFile} = require('server-utils');

module.exports = ((config) => {
    const {
        ARTICLES__PATH,
        TEASERS__PATH,
        ARTICLE_PROFILE_IMG__PATH
    } = config;

    return updateFilesOfArticle

    function updateFilesOfArticle(req, updatedArticleDataFromDb, newArticleDetails) {
        let promisesToExecuteFirst = [
            updateTeaserInFile(updatedArticleDataFromDb, newArticleDetails),
            updateArticleBodyInFile(updatedArticleDataFromDb, newArticleDetails)
        ];
        
        let promisesToexecuteLast = [
            renameArticleBodiesFile(updatedArticleDataFromDb)
        ]
        
        let hasArticleNewProfImg = Boolean(req.file);
        if (hasArticleNewProfImg) {
            promisesToexecuteLast.push(deleteOldProfileImage(updatedArticleDataFromDb))    
        }
        
        return executeUpdatesSequentially(promisesToExecuteFirst, promisesToexecuteLast);
    }
    
    function updateArticleBodyInFile(updatedArticleDataFromDb, newArticleDetails) {
        let currArticleFileName = updatedArticleDataFromDb.oldArticleFileName
        let newArticleBody = newArticleDetails.articleHtml,
        currArticleFilePath = `${ARTICLES__PATH}/${currArticleFileName}`;
        
        return updateFile(currArticleFilePath, newArticleBody);
    }
    
    function updateTeaserInFile(updatedArticleDataFromDb, newArticleDetails) {
        let teaserFileName = updatedArticleDataFromDb.teaserFileName,
            teaserFilePath = `${TEASERS__PATH}/${teaserFileName}`,
            newTeaserBody = newArticleDetails.teasersHtml;
        
        return updateFile(teaserFilePath, newTeaserBody);
    }

    function deleteOldProfileImage(updatedArticleDataFromDb) {
        let oldArticleProfImgfileName = updatedArticleDataFromDb.oldArticleProfImgfileName;
            oldArticleProfImgfilePath = `${ARTICLE_PROFILE_IMG__PATH}/${oldArticleProfImgfileName}`;

        return deleteFile(oldArticleProfImgfilePath);
    }
    
    function renameArticleBodiesFile(updatedArticleDataFromDb) {
        let newArticleFileName = updatedArticleDataFromDb.newArticleFileName, 
            currArticleFileName = updatedArticleDataFromDb.oldArticleFileName,
            newArticleFilePath = `${ARTICLES__PATH}/${newArticleFileName}`,
            currArticleFilePath = `${ARTICLES__PATH}/${currArticleFileName}`;

        return renameFile(currArticleFilePath, newArticleFilePath)
    }

    function executeUpdatesSequentially(promisesToexecuteFirst, promisesToexecuteLast) {
        return new Promise((resolve, reject) => {
            return Promise.all(promisesToexecuteFirst)
            .then(() => {
                return Promise.all(promisesToexecuteLast);
            })
            .then(() => {
                resolve();
            })
            .catch(e => {
                reject(e);
            });
        });
    }
});