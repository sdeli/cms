use cms;

drop procedure if exists updateArticleDetails;
delimiter //

create procedure updateArticleDetails(
	in articleId char(18),
	in newArticleName char(50),
    in articleNameInUrl char(50),
    in newPageTitle char(25),
    in articleFileName char(69)
)
begin
    declare oldArticleFileName char(69);
    declare updatedRowsCount char(69);
    
    set global autocommit = 0;
    
    START TRANSACTION;
		select article_file_name into oldArticleFileName
		from articles where article_id = articleId;
		
		update articles 
		set 
			article_name = newArticleName, 
			page_title = newPageTitle, 
			article_file_name = articleFileName,
            article_name_in_url = articleNameInUrl
		where article_id = articleId;
        
        select row_count() as updatedRowsCount;
        
		select article_file_name as newArticleFileName, teaser_file_name as teaserFileName, oldArticleFileName
        from articles where article_id = articleId;
    COMMIT;

    set global autocommit = 1;
end //
delimiter ;

#call updateArticleDetails('18nt5rujpfk8vbz', 'majom11', 'majom11', 'majom111', 'majo111m');