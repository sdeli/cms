const Flash = require('front-end-widgets/flash-message');
const flash = new Flash('.flash-messages');

module.exports = ((config) => {
    const {
        FALLBACK_ERR_FLASH, 
        UPDATE_TABLE_SORT__EP, 
    } = config;

    return updateArticlesSort;
    
    function updateArticlesSort(ui) {
        let sortedRowsArr = $(ui.target).children().toArray();
    
        let articlesSortArr = formatSortedRowsArrForServer(sortedRowsArr);
        
        $.ajax(UPDATE_TABLE_SORT__EP, {
            data : JSON.stringify(articlesSortArr),
            contentType : "application/json",
            type : "POST"
        }).done(res => {
            displayFlashNotification(res);
        }).fail(error => {
            flash.display(flash.WARNING , FALLBACK_ERR_FLASH);
            return;
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
            flash.display(flash.SUCCESS, res.msg);
            return;
        } 
        
        let updateWasntSuccesful = typeof res.errMsg !== 'undefined' && typeof res.msg === 'undefined'; 
        if (updateWasntSuccesful) {
            flash.display(flash.WARNING, res.errMsg);
            return;
        } 
        
        let unexpectedErrorHappened = typeof res.errMsg === 'undefined' && typeof res.msg === 'undefined';
        if (unexpectedErrorHappened) {
            flash.display(flash.WARNING , FALLBACK_ERR_FLASH);
            return;
        }
    }
});