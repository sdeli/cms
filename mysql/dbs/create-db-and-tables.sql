drop database if exists cms;
create database cms
CHARACTER SET latin2 COLLATE latin2_hungarian_ci;

use cms;

drop table if exists articles;
create table articles (
	article_id char(18) not null unique,
	article_name varchar(70) not null,
    page_title varchar(70) not null,
    article_file_name char(100) not null unique,
    teaser_file_name char(25) not null unique,
    article_prof_img_file_name char(43) default null unique,
    sort tinyint default 0,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    primary key (article_id)
);

drop table if exists article_categories;
create table article_categories (
	article_category_id varchar(50) default null unique,
	article_category_name varchar(25) not null unique,
    sort tinyint default 0,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    primary key (article_category_name)
);

drop table if exists categories_of_articles;
create table categories_of_articles (
	id int auto_increment primary key,
	article_category_id varchar(50) not null,
    article_id char(18) not null
);

CREATE TABLE users (
  user_id char(18) not null unique,
  name char(50) NOT NULL,
  email char(50) NOT NULL,
  password_hash char(255) NOT NULL,
  avatar_img_file_name char(43) default null unique,
  is_activated tinyint(4) NOT NULL default 0,
  activation_token_hash char(64) DEFAULT NULL,
  user_created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (user_id),
  UNIQUE KEY email (email)
);

# ==== articles table changes ====
alter table articles 
add index article_file_name_index (article_file_name);

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