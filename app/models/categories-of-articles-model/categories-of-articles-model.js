const dbPool = require('widgets/db-pool');

const categoriesOfArticlesModel = (() => {
    
    function insertArticlesCategories(articleId, articleCategories) {
        articleId = dbPool.escape(articleId);
        let sql = 'set autocommit = 0;\nSTART TRANSACTION;\n';

        articleCategories.forEach(idOfArticleCateg => {
            idOfArticleCateg = dbPool.escape(idOfArticleCateg);

            sql += ``
                + `insert into categories_of_articles (article_category_id, article_id)`
                + `values (${idOfArticleCateg}, ${articleId});\n`    
        });

        sql += 'COMMIT;\nset autocommit = 1;';

        return dbPool.queryProm(sql);
    }

    function getCategoriesOfArticle(articleId) {
        articleId = dbPool.escape(articleId);

        let sql = ``
            + 'use cms;'
            + 'select\n'
                + 'article_category_name as articleCategoryName,\n'
                + 'article_categories.article_category_id as articleCategoryId\n' 
            + 'from categories_of_articles\n'
            + 'inner join article_categories\n'
            + `on categories_of_articles.article_id = ${articleId}\n`
            + 'and categories_of_articles.article_category_id = article_categories.article_category_id;\n'
        
        return dbPool.queryProm(sql);
    }

    function updateCategoriesOfArticle(articleId, articleCategories = []) {
        articleId = dbPool.escape(articleId);

        let sql = ``
                + 'use cms;'
                + 'START TRANSACTION;\nset autocommit = 0;\n'
                + `delete from categories_of_articles where article_id = ${articleId};\n`

        articleCategories.forEach(idOfArticleCateg => {
            idOfArticleCateg = dbPool.escape(idOfArticleCateg);

            sql += ``
                + `insert into categories_of_articles (article_category_id, article_id)\n`
                + `values (${idOfArticleCateg}, ${articleId});\n`    
        });

        sql += 'set autocommit = 1;\n';

        return dbPool.queryProm(sql);
    }
        
    return {
        insertArticlesCategories,
        getCategoriesOfArticle,
        updateCategoriesOfArticle
    }
})();

module.exports = categoriesOfArticlesModel;
