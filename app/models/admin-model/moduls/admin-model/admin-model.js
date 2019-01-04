const dbPool = require('db-pool');

module.exports = ((config) => {
    const {
        ARTICLE_DATA_NOT_FOUND_IN_DB__ERR_MSG,
        ARTICLE_CATOGERIE_IS_NOT_FOUND_IN_DB__ERR
    } = config
    
    const adminModel = (() => {
        function insertArticleData(articleData) {
            let id = dbPool.escape(articleData.id), 
            articleName = dbPool.escape(articleData.articleName), 
            pageTitle = dbPool.escape(articleData.pageTitle), 
            articleFileName = dbPool.escape(articleData.articleFileName), 
            articleNameInUrl = dbPool.escape(articleData.articleNameInUrl), 
            teaserFileName = dbPool.escape(articleData.teaserFileName);
            
            let sql = `insert into articles (article_id, article_name, article_name_in_url, page_title, article_file_name, teaser_file_name) values (${id}, ${articleName}, ${articleNameInUrl}, ${pageTitle}, ${articleFileName}, ${teaserFileName});`;
            
            return dbPool.queryProm(sql);
        }

        function insertArticleCategoryDataIfUnique(articleCategoryName) {
            articleCategoryName = dbPool.escape(articleCategoryName);

            let sql = `call insertArticleCategoryDataIfUnique(${articleCategoryName})`;
            
            return new Promise((resolve, reject) => {
                return dbPool.queryProm(sql)
                .then(({results}) => {
                    let isArticleCategoryUnique = Boolean(results[0][0].isArticleCateogryUnique);
                    resolve(isArticleCategoryUnique);
                })
                .catch(e => {
                    reject(e);
                });
            });
        }
        
        function getAllArticles() {
            let sql = `SELECT article_id, article_name, created_at, article_file_name, sort FROM articles order by sort desc, created_at;`;
            
            return dbPool.queryProm(sql);
        }

        function getAllArticleCategories() {
            let sql = `SELECT article_category_id as articleCategoryId, article_category_name as articleCategoryName, sort, created_at as createdAt FROM article_categories order by sort desc, created_at;`;
            
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

        function updateArticlesCategoriesSort(articlesCategoriesNewSortArr) {
            let sql = 'set autocommit = 0;\nSTART TRANSACTION;\n';
            
            articlesCategoriesNewSortArr.forEach(currAticleCategoriesObj => {
                let sort = dbPool.escape(currAticleCategoriesObj.sort);
                let currArticleCageorieId = dbPool.escape(currAticleCategoriesObj.id);
                
                sql += `update article_categories set sort = ${sort} where article_category_id = ${currArticleCageorieId};\n`
            });
            
            sql += 'COMMIT;\nset autocommit = 1;';
            
            return dbPool.queryProm(sql);
        }
        
        function getArticle(articleId) {
            articleId = dbPool.escape(articleId);

            let sql = `select article_name as articleName, page_title as pageTitle, article_file_name as articleFileName, teaser_file_name as teaserFileName from articles where article_id = ${articleId};`;
            
            return dbPool.queryProm(sql);
        }
        
        function getArticleTitleAndName(articleFileName) {
            articleFileName = dbPool.escape(articleFileName);

            let sql = `select article_name as articleName, page_title as pageTitle from articles where article_file_name = ${articleFileName};`;
            
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

        function getArticleCategory(articleCategoryName) {
            articleCategoryName = dbPool.escape(articleCategoryName);
            let sql = `select article_category_name as articleCategoryName from article_categories
            where article_category_name = ${articleCategoryName};`;
            
            return dbPool.queryProm(sql);
        }
        // results.results[0].articleCategoryName
        function checkIfArticleCategExists(articleCategoryName) {
            return new Promise((resolve, reject) => {
                getArticleCategory(articleCategoryName)
                .then(({results}) => {
                    let doestArticleCategoryExist = results.length > 0;
                    resolve(doestArticleCategoryExist)
                })
                .catch(e => {
                    reject(e);
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
            articleNameInUrl = dbPool.escape(newArticleDetails.articleNameInUrl),
            pageTitle = dbPool.escape(newArticleDetails.pageTitle),
            articleFileName = dbPool.escape(newArticleDetails.articleFileName)
            
            let sql = `call updateArticleDetails(${articleId}, ${articleName}, ${articleNameInUrl}, ${pageTitle}, ${articleFileName});`;
            
            return new Promise((resolve, reject) => {
                dbPool.queryProm(sql)
                .then(({results}) => {
                    let articleDataInDbFoundAndUpdated = results[0][0].updatedRowsCount > 0;
                    
                    if (articleDataInDbFoundAndUpdated) {
                        let articleData = results[1][0];
                        resolve(articleData);
                    } else {
                        reject(ARTICLE_DATA_NOT_FOUND_IN_DB__ERR_MSG);
                    }
                })
                .catch(e => {
                    reject(e);
                });
            });
        }
        // results.changedRows
        function updateArticleCategoryName(articleCategoryData) {
            currArticleCategoryName = dbPool.escape(articleCategoryData.currName);
            newArticleCategoryName = dbPool.escape(articleCategoryData.newName);
            
            let sql = `update article_categories set article_category_name = ${newArticleCategoryName} where binary article_category_name = ${currArticleCategoryName};`;
            
            return new Promise((resolve, reject) => {
                dbPool.queryProm(sql)
                .then(({results}) => {
                    let articleCategoryNameUpdated = results.changedRows === 1;
                    
                    if (articleCategoryNameUpdated) {
                        resolve();
                    } else {
                        let warningMsg = `${ARTICLE_CATOGERIE_IS_NOT_FOUND_IN_DB__ERR} ${currArticleCategoryName}`;
                        reject(warningMsg);
                    }
                })
                .catch(e => {
                    reject(e);
                });
            });
        }
        
        function deleteArticleCategory(articleCategoryName) {
            articleCategoryName = dbPool.escape(articleCategoryName);
            let sql = `delete from article_categories where article_category_name = ${articleCategoryName};`;

            return new Promise((resolve, reject) => {
                dbPool.queryProm(sql)
                .then(({results}) => {
                    let wasArticleCategoryNotFoundInDb = results.affectedRows < 1;

                    if (wasArticleCategoryNotFoundInDb) {
                        let warningMsg = `${ARTICLE_CATOGERIE_IS_NOT_FOUND_IN_DB__ERR} ${articleCategoryName}`;
                        reject(warningMsg);
                    } else {
                        resolve(results.affectedRows);
                    }
                })
                .catch((e) => {
                    reject(e);
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
            insertArticleCategoryDataIfUnique,
            getAllArticles,
            getAllArticleCategories,
            updateArticlesSort,
            updateArticlesCategoriesSort,
            getArticle,
            updateArticleData,
            deleteArticleData,
            deleteArticleCategory,
            getArticleCategory,
            checkIfArticleCategExists,
            updateArticleCategoryName,
            getArticleTitleAndName,
            checkAutocommit
        }
    })();

    return adminModel;
});
