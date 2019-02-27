drop DATABASE if exists cms;
CREATE DATABASE cms DEFAULT CHARACTER SET latin2 COLLATE latin2_hungarian_ci;
use cms;

CREATE TABLE article_categories (
  article_category_id int(11) AUTO_INCREMENT,
  article_category_name varchar(25) unique not null,
  sort tinyint(4) DEFAULT '0',
  created_at char(19) not null,
  PRIMARY KEY (article_category_id)
);

CREATE TABLE articles (
  article_id char(18) not null,
  article_name varchar(70) not null,
  page_title varchar(70) not null,
  article_file_name char(100) not null unique,
  teaser_file_name char(25) not null unique,
  square_article_prof_img_file_name char(49) unique default null,
  flat_article_prof_img_file_name char(47) unique default null,
  sort tinyint(4) DEFAULT 0,
  created_at char(19) not null,
  PRIMARY KEY (article_id)
);

CREATE TABLE categories_of_articles (
  article_category_id int(11),
  article_id char(18)
);

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