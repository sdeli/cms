const config = require('config');
const dbPool = require('widgets/db-pool');

const ARTICLE_PROFILE_IMG__LINK = config.links.article.img.profile,
    ARTICLE__LINK = config.restEndpoints.blog.article.replace(/(.*\/):.*/, '$1');

function insertArticleData(articleData) {
    let id = dbPool.escape(articleData.id), 
    articleName = dbPool.escape(articleData.articleName), 
    pageTitle = dbPool.escape(articleData.pageTitle), 
    articleFileName = dbPool.escape(articleData.articleFileName), 
    teaserFileName = dbPool.escape(articleData.teaserFileName),
    squareArticleProfImgfileName = dbPool.escape(articleData.squareArticleProfImgfileName),
    flatArticleProfImgfileName = dbPool.escape(articleData.flatArticleProfImgfileName),
    createdAt = dbPool.escape(articleData.createdAt);

    let sql = ''
        + 'use cms;\n'
        + 'insert into articles\n'
            + '(article_id, article_name, page_title, article_file_name, teaser_file_name, square_article_prof_img_file_name, flat_article_prof_img_file_name, created_at)\n'
            + `values (${id}, ${articleName}, ${pageTitle}, ${articleFileName}, ${teaserFileName}, ${squareArticleProfImgfileName}, ${flatArticleProfImgfileName}, ${createdAt});`;
    
    return dbPool.queryProm(sql);
}

function getAllArticles() {
    //use hotel_data_db;
    let sql = ''
    + 'use cms;\n'
    + 'select article_id, article_name, created_at, article_file_name, sort\n'
    + 'from articles\n'
    + 'order by sort desc, created_at;';
    
    return dbPool.queryProm(sql);
}

function updateArticlesSort(articlesNewSortArr) {
    let sql = '' 
        + 'use cms;\n'
        + 'START TRANSACTION;\nset autocommit = 0;';
    
    articlesNewSortArr.forEach(articleObj => {
        let sort = dbPool.escape(articleObj.sort);
        let articleId = dbPool.escape(articleObj.id);
        
        sql += `update articles set sort = ${sort} where article_id = ${articleId};\n`
    });
    
    sql += 'set autocommit = 1;\nCOMMIT;';
    
    return dbPool.queryProm(sql);
}

function getArticleData(articleId) {
    articleId = dbPool.escape(articleId);
    let articleProfImgLink = dbPool.escape(ARTICLE_PROFILE_IMG__LINK);

    let sql = ''
    + 'use cms;\n'
    + 'select\n'
        + 'article_name as articleName,\n'
        + 'page_title as pageTitle,\n'
        + 'article_file_name as articleFileName,\n'
        + 'teaser_file_name as teaserFileName,\n'
        + `concat(${articleProfImgLink}, '/',square_article_prof_img_file_name) as squareArticleProfileImgLink,\n`
        + `concat(${articleProfImgLink}, '/',flat_article_prof_img_file_name) as flatArticleProfileImgLink,\n`
        + `square_article_prof_img_file_name as squareArticleProfileImgFileName,\n`
        + `flat_article_prof_img_file_name as flatArticleProfileImgFileName\n`
    + `from articles where article_id = ${articleId};`;
    
    return dbPool.queryProm(sql);
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
        + 'use cms;\n'

        + `select\n` 
            + `article_file_name as articleFileName,\n`
            + `teaser_file_name as teaserFileName,\n`
            + `teaser_file_name as teaserFileName,\n`
            + `square_article_prof_img_file_name as squareArticleProfileImgFileName,\n`
            + `flat_article_prof_img_file_name as flatArticleProfileImgFileName\n`
        + `from articles\n`
        + `where article_id = ${articleId};\n`

        + `delete from articles where article_id = ${articleId};`
    
    return new Promise((resolve, reject) => {
        dbPool.queryCb(sql, (err, results, fields) => {
            try {
                if (err) {
                    reject(err);
                    return;
                }
                
                let articleRowFoundAndDeleted = results[2].affectedRows >= 1;
                if (!articleRowFoundAndDeleted) {
                    resolve(false);
                    return;
                }
    
                let deletedArticle = {
                    bodysCurrFile : results[1][0].articleFileName,
                    teasersCurrFile : results[1][0].teaserFileName,
                    squareArticleProfileImgFileName : results[1][0].squareArticleProfileImgFileName,
                    flatArticleProfileImgFileName : results[1][0].flatArticleProfileImgFileName
                }
    
                resolve(deletedArticle);
            } catch (err) {
                reject(err);
            }
        });
    }); 
}

function updateArticleData(newArticleDetails) {
    let articleId = dbPool.escape(newArticleDetails.articleId),
        articleName = dbPool.escape(newArticleDetails.articleName),
        pageTitle = dbPool.escape(newArticleDetails.pageTitle),
        articleFileName = dbPool.escape(newArticleDetails.articleFileName);
    
    let sql = ''
        + 'use cms;\n'

        + 'select\n' 
            + 'article_file_name as oldArticleFileName,\n'
            + 'square_article_prof_img_file_name as oldSquareArticleProfileImgFileName,\n' 
            + 'flat_article_prof_img_file_name as oldFlatArticleProfileImgFileName,\n' 
            + 'teaser_file_name as teaserFileName\n' 
		+ 'from articles\n'
        + `where article_id = ${articleId};\n`

        + 'update articles\n'
            + 'set\n'
                + `article_name = ${articleName},\n`
                + `page_title = ${pageTitle},\n`
                + `article_file_name = ${articleFileName}`;

    let hasNewSquareArticleProfileImg = Boolean(newArticleDetails.squareArticleProfileImgFileName);
    if (hasNewSquareArticleProfileImg) {
        let squareArticleProfileImgFileName = dbPool.escape(newArticleDetails.squareArticleProfileImgFileName);
        sql += `,\nsquare_article_prof_img_file_name = ${squareArticleProfileImgFileName}`;
    }

    let hasNewFlatArticleProfileImg = Boolean(newArticleDetails.flatArticleProfileImgFileName);
    if (hasNewFlatArticleProfileImg) {
        let flatArticleProfileImgFileName = dbPool.escape(newArticleDetails.flatArticleProfileImgFileName)
        sql += `,\nflat_article_prof_img_file_name = ${flatArticleProfileImgFileName}`;
    }

    sql += `\nwhere article_id = ${articleId};`;

    return new Promise((resolve, reject) => {
        dbPool.queryProm(sql)
        .then(results => {
            let updatedArticleDataFromDb = results[0];
            resolve(updatedArticleDataFromDb)
        })
        .catch(err => {
            reject(err);
        })
        
    });
}

function getArticlesDataByCategory(category) {
    // If didnt specify category we server data about all articles.
    let didSpecifyCategory = Boolean(category);
    category = didSpecifyCategory ? dbPool.escape(category) : null;
    articleProfImgLink = dbPool.escape(ARTICLE_PROFILE_IMG__LINK);
    articleLink = dbPool.escape(ARTICLE__LINK);

    let sql = ''
        + 'use cms;\n'
        + `select\n`
            + `articles.article_id as articleId,\n` 
            + `article_name as articleName,\n`
            + `article_file_name as articleFileName,\n`
            + `concat(${articleLink}, article_file_name) as articleLink,\n`
            + `teaser_file_name as teaserFileName,\n`
            + `concat(${articleProfImgLink}, '/',square_article_prof_img_file_name) as squareArticleProfileImgLink,\n`
            + `concat(${articleProfImgLink}, '/',flat_article_prof_img_file_name) as flatArticleProfileImgLink\n`
        + `from articles`;

        if (didSpecifyCategory) {
            sql += ` inner join categories_of_articles\n`
            + `on\n` 
                + `articles.article_id = categories_of_articles.article_id\n`
            + 'inner join article_categories\n'
                + `on categories_of_articles.article_category_id = article_categories.article_category_id\n`
                + `and article_categories.article_category_name = ${category}`;
        }

        sql += '\norder by articles.sort desc, articles.created_at;';

    return dbPool.queryProm(sql)
}

function checkAutocommit() {
    const sql = ``
        + `select @@autocommit;`
        + `set @@autocommit = 1;`
        + `set @autocommit2 = 1;`
        + `select @@autocommit;`;
        
    return dbPool.queryProm(sql);
}
            
module.exports = {
    insertArticleData,
    getAllArticles,
    updateArticlesSort,
    getArticleData,
    updateArticleData,
    deleteArticleData,
    getArticleDataByFileName,
    getArticlesDataByCategory,
    checkAutocommit
};
