# create db and tables
source ./dbs/create-db-and-tables.sql

# create procedures
source ./procedures/update-article-details.sql
source ./procedures/insert-article-category-data-If-unique.sql
source ./insert-data/insert-test-article-data.sql