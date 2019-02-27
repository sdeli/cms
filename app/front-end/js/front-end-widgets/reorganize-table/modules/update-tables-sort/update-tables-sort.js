const Flash = require('front-end-widgets/bootstrap-flash-message');

module.exports = ((config) => {
    const {
        FALLBACK_ERR_FLASH, 
        UPDATE_TABLE_SORT__EP,
        FLASH_MSGS_DIV__SEL
    } = config;

    return updateArticlesSort;
    
    function updateArticlesSort(ui) {
        let sortedRowsArr = $(ui.target).children().toArray();
    
        let articlesSortArr = formatSortedRowsArrForServer(sortedRowsArr);
        
        $.ajax(UPDATE_TABLE_SORT__EP, {
            data : JSON.stringify(articlesSortArr),
            contentType : "application/json",
            type : "PUT"
        }).done(res => {
            displayFlashNotification(res);
        }).fail(() => {
            let flash = new Flash(Flash.ALERT, FALLBACK_ERR_FLASH)
            flash.display(FLASH_MSGS_DIV__SEL);
        });
    }

    function formatSortedRowsArrForServer(sortedRowsArr) {
        let articlesSortArr = sortedRowsArr.reduce((accumulator, currArticle, i) => {
            let currArticleSort = {
                id : currArticle.getAttribute('id'),
                sort : sortedRowsArr.length - i
            }
    
            return [...accumulator, currArticleSort];
        }, []);

        return articlesSortArr;
    }

    function displayFlashNotification(res) {
        let updateWasSuccesful = typeof res.errMsg === 'undefined' && typeof res.msg !== 'undefined'; 
        if (updateWasSuccesful) {
            let flash = new Flash(Flash.SUCCESS, res.msg)
            flash.display(FLASH_MSGS_DIV__SEL);
            return;
        } 
        
        let updateWasntSuccesful = typeof res.errMsg !== 'undefined' && typeof res.msg === 'undefined'; 
        if (updateWasntSuccesful) {
            let flash = new Flash(Flash.ALERT, res.errMsg)
            flash.display(FLASH_MSGS_DIV__SEL);
            return;
        } 
        
        let unexpectedErrorHappened = typeof res.errMsg === 'undefined' && typeof res.msg === 'undefined';
        if (unexpectedErrorHappened) {
            let flash = new Flash(Flash.ALERT, FALLBACK_ERR_FLASH)
            flash.display(FLASH_MSGS_DIV__SEL);
            return;
        }
    }
});