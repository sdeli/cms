module.exports = ((ownCategs, allCategs) => {
    
    return getOwnCategsCheckedArr(ownCategs, allCategs);
    
    function getOwnCategsCheckedArr(ownCategs, allCategs) {
        let ownCategNames = getNamesOfOwnCategs(ownCategs);

        let ownCategsCheckedArr = allCategs.reduce((accumulator, currCateg) => {
            let hasArticleCurrCateg = checkIfArticleHasCurrCateg(ownCategNames, currCateg);
            
            if(hasArticleCurrCateg){
                currCateg.checked = 'checked';
                return [...accumulator, currCateg];
            } else {
                currCateg.checked = false;
                return [...accumulator, currCateg];
            }
        }, []);
        
        return ownCategsCheckedArr;
    }
    
    function getNamesOfOwnCategs(ownCategs) {
        ownCategNames = ownCategs.reduce((accumulator, currOwnCateg) => {
            return [...accumulator, currOwnCateg.articleCategoryName];
        }, []);

        return ownCategNames;
    }
    
    function checkIfArticleHasCurrCateg(ownCategNames, currCateg) {
        let hasArticleCurrCateg = ownCategNames.find((currOwnCategName) => {
            return currCateg.articleCategoryName === currOwnCategName;
        });
        
        return Boolean(hasArticleCurrCateg);
    }
});
