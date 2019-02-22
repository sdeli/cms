drop procedure if exists insertArticleCategoryDataIfUnique;
delimiter //

create procedure insertArticleCategoryDataIfUnique(
	in articleCategoryId varchar(50),
	in newArticleCategoryName char(50)
)
begin
    declare sameArticleCategoriesCount tinyint;
    
    START TRANSACTION;
		set global autocommit = 0;
		select count(article_category_name) into sameArticleCategoriesCount from article_categories
        where article_category_name = newArticleCategoryName;
        
        IF sameArticleCategoriesCount > 0 THEN
			select 0 as isArticleCateogryUnique;
		ELSE
			insert into article_categories (article_category_id, article_category_name, sort) values (articleCategoryId, newArticleCategoryName, 0);
            select 1 as isArticleCateogryUnique;
		END IF;
        set global autocommit = 1;
    COMMIT;
end //
delimiter ;

#call insertArticleCategoryDataIfUnique('news');