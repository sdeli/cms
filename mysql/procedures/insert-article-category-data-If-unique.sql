drop procedure if exists insertArticleCategoryDataIfUnique;
delimiter //

create procedure insertArticleCategoryDataIfUnique(
	in newArticleCategoryName char(50),
    in createdAt char(19)
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
			insert into article_categories (article_category_name, sort, created_at) 
			values (newArticleCategoryName, 0, createdAt);
            
            select 1 as isArticleCateogryUnique;
		END IF;
        set global autocommit = 1;
    COMMIT;
end //
delimiter ;