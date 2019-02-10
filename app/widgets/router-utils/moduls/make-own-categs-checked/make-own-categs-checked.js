module.exports = makeOwnCategsCheckedArr;

function makeOwnCategsCheckedArr(req, articleCategsArr) {
    let hasCheckedArticleCategories = Boolean(req.body.articleCategories);

    let checkedCategsIds = hasCheckedArticleCategories ? req.body.articleCategories : [];

    articleCategsArr = articleCategsArr.reduce((accumulator, currCateg) => {
        let isCategCheckedByUser = checkIfCurrCategIsCheckedByUser(checkedCategsIds, currCateg)

        if (isCategCheckedByUser) {
            currCateg.checked = 'checked';
        } else {
            currCateg.checked = false;
        }

        return [...accumulator, currCateg]
    }, []);

    return articleCategsArr;
}

function checkIfCurrCategIsCheckedByUser(checkedCategsIds, currCateg,) {
    let isCategCheckedByUser = checkedCategsIds.find(currCheckedCategsId => {
        return currCateg.articleCategoryId === currCheckedCategsId;
    });
    
    return Boolean(isCategCheckedByUser);
}