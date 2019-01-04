use cms;

drop procedure if exists insertArticleCategoryDataIfUnique;
delimiter //

create procedure insertArticleCategoryDataIfUnique(
	in newArticleCategoryName char(50)
)
begin
    declare sameArticleCategoriesCount tinyint;
    
    set global autocommit = 0;
    
    START TRANSACTION;
		select count(article_category_name) into sameArticleCategoriesCount from article_categories
        where article_category_name = newArticleCategoryName;
        
        IF sameArticleCategoriesCount > 0 THEN
			select 0 as isArticleCateogryUnique;
		ELSE
			insert into article_categories (article_category_name, sort) values (newArticleCategoryName, 0);
            select 1 as isArticleCateogryUnique;
		END IF;
    COMMIT;

    set global autocommit = 1;
end //
delimiter ;

#call insertArticleCategoryDataIfUnique('news');