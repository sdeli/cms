const dbPool = require('db-pool');

module.exports = ((config) => {
    const {
        ARTICLE_DATA_NOT_FOUND_IN_DB__ERR_MSG,
        ARTICLE_PROFILE_IMG__LINK
    } = config
    
    const articlesModel = (() => {
        function insertArticleData(articleData) {
            let id = dbPool.escape(articleData.id), 
            articleName = dbPool.escape(articleData.articleName), 
            pageTitle = dbPool.escape(articleData.pageTitle), 
            articleFileName = dbPool.escape(articleData.articleFileName), 
            teaserFileName = dbPool.escape(articleData.teaserFileName),
            articleProfImgfileName = dbPool.escape(articleData.articleProfImgfileName);

            let sql = `insert into articles (article_id, article_name, page_title, article_file_name, teaser_file_name, article_prof_img_file_name) values (${id}, ${articleName}, ${pageTitle}, ${articleFileName}, ${teaserFileName}, ${articleProfImgfileName});`;
            
            return dbPool.queryProm(sql);
        }
        
        function getAllArticles() {
            let sql = `SELECT article_id, article_name, created_at, article_file_name, sort FROM articles order by sort desc, created_at;`;
            
            return dbPool.queryProm(sql);
        }
        
        function updateArticlesSort(articlesNewSortArr) {
            let sql = 'set autocommit = 0;\nSTART TRANSACTION;\n';
            
            articlesNewSortArr.forEach(articleObj => {
                let sort = dbPool.escape(articleObj.sort);
                let articleId = dbPool.escape(articleObj.id);
                
                sql += `update articles set sort = ${sort} where article_id = ${articleId};\n`
            });
            
            sql += 'COMMIT;\nset autocommit = 1;';
            
            return dbPool.queryProm(sql);
        }
        
        function getArticleData(articleId) {
            articleId = dbPool.escape(articleId);
            let articleProfImgLink = dbPool.escape(ARTICLE_PROFILE_IMG__LINK);

            let sql = `select article_name as articleName, page_title as pageTitle, article_file_name as articleFileName, teaser_file_name as teaserFileName, concat(${articleProfImgLink}, '/',article_prof_img_file_name) as articleProfImgLink from articles where article_id = ${articleId};`;
            
            return dbPool.queryPromise(sql);
        }
        
        function getArticleDataByFileName(articleFileName) {
            articleFileName = dbPool.escape(articleFileName);
            
            let sql = `select article_id as articleId, article_name as articleName, page_title as pageTitle, article_file_name as articleFileName, teaser_file_name as teaserFileName, concat(${articleProfImgLink}, '/',article_prof_img_file_name) as articleProfImgLink from articles where article_file_name = ${articleFileName};`;
            
            return new Promise((resolve) => {
                dbPool.queryCb(sql, (err, results, fields) => {
                    if (err) reject(err);

                    let isArticleInDb = results.length > 0;

                    if (isArticleInDb) {
                        let articleData = results[0];
                        resolve(articleData);
                    } else {
                        resolve(false);
                    }
                });
            });
        }
        
        function deleteArticleData(articleId) {
            articleId = dbPool.escape(articleId);
            
            let sql = ''
             + `SET global autocommit = 0;\n`
             + `START TRANSACTION;\n`
	            + `select article_file_name as articleFileName, teaser_file_name as teaserFileName from articles where article_id = ${articleId};\n`
	            + `delete from articles where article_id = ${articleId};\n`
             + `COMMIT;\n`
             + `SET global autocommit = 1;\n`;
            
            return new Promise((resolve, reject) => {
                dbPool.queryCb(sql, (err, results, fields) => {
                    if (err) {
                        reject(err);
                        return;
                    }
                    
                    let articlesRowFoundAndDeleted = results[3].affectedRows >= 1;
                    if (!articlesRowFoundAndDeleted) {
                        reject(false);
                        return;
                    }

                    let deletedArticle = {
                        bodysCurrFile : results[2][0].articleFileName,
                        teasersCurrFile : results[2][0].teaserFileName
                    }

                    resolve(deletedArticle);
                });
            }); 
        }
        
        function updateArticleData(newArticleDetails) {
            let articleId = dbPool.escape(newArticleDetails.articleId),
            articleName = dbPool.escape(newArticleDetails.articleName),
            pageTitle = dbPool.escape(newArticleDetails.pageTitle),
            articleFileName = dbPool.escape(newArticleDetails.articleFileName)
            articleProfImgfileName = dbPool.escape(newArticleDetails.articleProfImgfileName)
            
            let sql = `call updateArticleDetails(${articleId}, ${articleName}, ${pageTitle}, ${articleFileName}, ${articleProfImgfileName});`;
            
            return new Promise((resolve, reject) => {
                dbPool.queryCb(sql, (err, results, fields) => {
                    let articleDataInDbFoundAndUpdated = results[0][0].updatedRowsCount > 0;
                    
                    if (articleDataInDbFoundAndUpdated) {
                        let articleData = results[1][0];
                        resolve(articleData);
                    } else {
                        reject(ARTICLE_DATA_NOT_FOUND_IN_DB__ERR_MSG);
                    }
                });
            }); 
        }

        function getAllArticlesListData() {
            let articleProfImgLink = dbPool.escape(ARTICLE_PROFILE_IMG__LINK);

            let sql = `select article_name as articleName, teaser_file_name as teasersFileName, concat(${articleProfImgLink}, '/', article_prof_img_file_name) as articleProfImgLink from articles;`;
            
            return new Promise((resolve, reject) => {
                dbPool.queryCb(sql, (err, results) => {
                    if (err) {
                        reject(err);
                        return;
                    }
                    
                    let areArticlesInDb = results.length > 0;
                    if(areArticlesInDb) {
                        let articleBlogListData = results;
                        resolve(articleBlogListData);
                    } else {
                        resolve(false);
                    }
                });
            }); 
        }
        
        function checkAutocommit() {
            const sql = ``
                    + `select @@autocommit;`
                    + `set @@autocommit = 1;`
                    + `set @autocommit2 = 1;`
                    + `select @@autocommit;`;
                    
                    return dbPool.queryProm(sql);
                }
                
                function checkAutocommit2() {
                    const sql = ``
                    + `select @@autocommit;`
                    + `select @autocommit2 ;`

            return dbPool.queryProm(sql);
        }
        
        return {
            insertArticleData,
            getAllArticles,
            updateArticlesSort,
            getArticleData,
            updateArticleData,
            deleteArticleData,
            getArticleDataByFileName,
            getAllArticlesListData,
            checkAutocommit
        }
    })();

    return articlesModel;
});
