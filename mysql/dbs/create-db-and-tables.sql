drop database if exists cms;
create database cms;

use cms;

drop table if exists articles;
create table articles (
	article_id char(18) not null unique,
	article_name char(50) not null,
    article_name_in_url char(50) not null,
    page_title char(25) not null,
    article_file_name char(69) not null unique,
    teaser_file_name char(25) not null unique,
    sort tinyint default 0,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    primary key (article_id)
);

drop table if exists article_categories;
create table article_categories (
	article_category_id char(18) default null,
	article_category_name char(50) not null unique,
    sort tinyint default 0,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    primary key (article_category_name)
);

drop table if exists categories_of_articles;
create table categories_of_articles (
	article_category_name char(50) not null unique,
    article_id char(18) not null unique
);

DROP TRIGGER if exists article_categories;

DELIMITER //
CREATE TRIGGER article_categories 
    before insert ON article_categories
    FOR EACH ROW 
BEGIN
	set new.article_category_id = CAST(uuid_short() AS CHAR);

END //
DELIMITER ;

alter table articles 
add index article_file_name_index (article_file_name);

alter table categories_of_articles
add constraint article_category_name_fk
foreign key (article_category_name) 
references article_categories(article_category_name);

alter table categories_of_articles
add constraint article_id_fk
foreign key (article_id) 
references articles(article_id);