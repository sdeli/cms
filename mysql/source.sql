# create db and tables
source ./dbs/cms.sql
source ./dbs/users.sql

# create procedures
source ./procedures/update-article-details.sql
source ./procedures/insert-article-category-data-If-unique.sql