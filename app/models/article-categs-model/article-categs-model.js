const config = require('config');
const dbPool = require('widgets/db-pool');

const ARTICLE_CATOGERIE_IS_NOT_FOUND_IN_DB__ERR = config.errorMsgs.admin.articleCategory.notFoundInDb;

const articleCategsModel = (() => {
    function insertArticleCategoryDataIfUnique(articleCategoryName, createdAt) {
        articleCategoryName = dbPool.escape(articleCategoryName);
        createdAt = dbPool.escape(createdAt);

        let sql = `use cms; call insertArticleCategoryDataIfUnique(${articleCategoryName}, ${createdAt})`;
        
        return new Promise((resolve, reject) => {
            return dbPool.queryProm(sql)
            .then((results) => {
                let isArticleCategoryUnique = Boolean(results[0].isArticleCateogryUnique);
                resolve(isArticleCategoryUnique);
            })
            .catch(e => {
                reject(e);
            });
        });
    }

    function getAllArticleCategories() {
        let sql = ''
            + 'use cms;\n'
            + 'SELECT\n'
                + 'article_category_id as articleCategoryId,\n'
                + 'article_category_name as articleCategoryName,\n' 
                + 'sort,\n'
                + 'created_at as createdAt\n' 
            + 'FROM article_categories\n'
            + 'order by sort desc, created_at;';
        
        return dbPool.queryProm(sql);
    }

    // function executeSqlInTransaction(sqlQueriesArr) {
    //     let sqlTransaction = 'set autocommit = 0;\nSTART TRANSACTION;\n';
        
    //     sqlQueriesArr.forEach(sqlQuery => {
    //         sqlTransaction += sqlQuery
    //     });
        
    //     sqlTransaction += 'COMMIT;\nset autocommit = 1;';
        
    //     return dbPool.queryProm(sqlTransaction);
    // }

    function updateArticlesCategoriesSort(articlesCategoriesNewSortArr) {
        let sql = ''
            + 'use cms;\n'
            + 'START TRANSACTION;\nset autocommit = 0;\n';
        
        articlesCategoriesNewSortArr.forEach(currAticleCategoriesObj => {
            let sort = dbPool.escape(currAticleCategoriesObj.sort);
            let currArticleCageorieId = dbPool.escape(currAticleCategoriesObj.id);
            
            sql += `update article_categories set sort = ${sort} where article_category_id = ${currArticleCageorieId};\n`
        });
        
        sql += 'set autocommit = 1;\nCOMMIT;';
        
        return dbPool.queryProm(sql);
    }

    function getArticleCategory(articleCategoryName) {
        articleCategoryName = dbPool.escape(articleCategoryName);
        let sql = ''
            + 'use cms;\n'
            + 'select\n'
                + 'article_category_name as articleCategoryName\n'
                + 'from article_categories\n'
            + `where article_category_name = ${articleCategoryName};`;
        
        return dbPool.queryProm(sql);
    }
    
    function updateArticleCategoryName(articleCategoryData) {
        currArticleCategoryName = dbPool.escape(articleCategoryData.currName);
        newArticleCategoryName = dbPool.escape(articleCategoryData.newName);
        
        let sql = ''
        + 'use cms;\n'
        + `update article_categories set article_category_name = ${newArticleCategoryName} where binary article_category_name = ${currArticleCategoryName};`;
        
        return new Promise((resolve, reject) => {
            dbPool.queryProm(sql)
            .then((results) => {
                let articleCategoryNameUpdated = results.affectedRows === 1;
                
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
        let sql = ''
            + 'use cms;\n'
            + 'delete from article_categories\n'
            + `where article_category_name = ${articleCategoryName};`;

        return new Promise((resolve, reject) => {
            dbPool.queryProm(sql)
            .then((results) => {
                let wasArticleCategoryInDb = results.affectedRows > 0;
                resolve(wasArticleCategoryInDb);
            })
            .catch((e) => {
                reject(e);
            });
        });
    }

    function checkIfArticleCategExists(articleCategoryName) {
        return new Promise((resolve, reject) => {
            getArticleCategory(articleCategoryName)
            .then((results) => {
                let doestArticleCategoryExist = results.length > 0;
                resolve(doestArticleCategoryExist)
            })
            .catch(e => {
                reject(e);
            });
        });
    }
    
    return {
        insertArticleCategoryDataIfUnique,
        getAllArticleCategories,
        updateArticlesCategoriesSort,
        deleteArticleCategory,
        getArticleCategory,
        checkIfArticleCategExists,
        updateArticleCategoryName,
    }
})();

module.exports = articleCategsModel;
