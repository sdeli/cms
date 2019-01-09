drop database if exists cms;
create database cms
CHARACTER SET latin2 COLLATE latin2_hungarian_ci;

use cms;

drop table if exists articles;
create table articles (
	article_id char(18) not null unique,
	article_name char(50) not null,
    page_title char(25) not null,
    article_file_name char(69) not null unique,
    teaser_file_name char(25) not null unique,
    article_prof_img_file_name char(43) default null unique,
    sort tinyint default 0,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    primary key (article_id)
);

drop table if exists article_categories;
create table article_categories (
	article_category_id char(18) default null unique,
	article_category_name char(50) not null unique,
    sort tinyint default 0,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    primary key (article_category_name)
);

drop table if exists categories_of_articles;
create table categories_of_articles (
	id int auto_increment primary key,
	article_category_id char(18) not null,
    article_id char(18) not null
);

# ==== articles table changes ====
alter table articles 
add index article_file_name_index (article_file_name);

# ==== article_categories table changes ====
DROP TRIGGER if exists inserCategIdOnIsertIntoArticleCategories;

DELIMITER //
CREATE TRIGGER inserCategIdOnIsertIntoArticleCategories 
    before insert ON article_categories
    FOR EACH ROW 
BEGIN
	set new.article_category_id = CAST(uuid_short() AS CHAR);

END //
DELIMITER ;

# ==== categories_of_articles table changes ====
alter table categories_of_articles
add constraint article_category_id_fk
foreign key (article_category_id)
references article_categories(article_category_id) 
on delete cascade;

alter table categories_of_articles
add constraint article_id_fk
foreign key (article_id) 
references articles(article_id) 
on delete cascade;