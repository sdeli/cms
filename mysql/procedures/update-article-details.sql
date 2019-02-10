use cms;

drop procedure if exists updateArticleDetails;
delimiter //

create procedure updateArticleDetails(
	in articleId char(18),
	in newArticleName varchar(70),
    in newPageTitle varchar(70),
    in articleFileName varchar(100),
    in articleProfImgfileName char(43)
)
begin
    declare oldArticleFileName varchar(100);
    declare oldArticleProfImgfileName char(69);
    declare updatedRowsCount char(69);
    
    set global autocommit = 0;
    
    START TRANSACTION;
		select article_file_name, article_prof_img_file_name into 
        oldArticleFileName, oldArticleProfImgfileName
		from articles
        where article_id = articleId;
		
		IF isnull(articleProfImgfileName) THEN
			update articles 
			set article_name = newArticleName, page_title = newPageTitle, article_file_name = articleFileName
			where article_id = articleId;
		ELSE
			update articles 
			set article_name = newArticleName, page_title = newPageTitle, article_file_name = articleFileName,
            article_prof_img_file_name = articleProfImgfileName
			where article_id = articleId;
		END IF;
        
        select row_count() as updatedRowsCount;
        
		select 
			article_file_name as newArticleFileName, 
            teaser_file_name as teaserFileName, 
            oldArticleFileName,
            oldArticleProfImgfileName
        from articles 
        where article_id = articleId;
    COMMIT;

    set global autocommit = 1;
end //
delimiter ;

#call updateArticleDetails('18nt1wxjql9lolq', 'asdasdasd1', 'asdas123', 'asdasdasd1-18nt1wxjql9lolq', 'articleprofileimg-1546852401562');