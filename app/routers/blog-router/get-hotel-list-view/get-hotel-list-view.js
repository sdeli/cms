const config = require('config');
const {getBlogNavLinks} = require('widgets/router-utils');
let getHotelData = require('./modules/get-hotel-data/get-hotel-data.js');

const HOTELS_LIST_VIEW__PATH = config.viewPathes.blog.hotelList, 
    HOTELS_LIST_VIEW__TITLE = config.templateConf.blog.hotelList.title, 
    HOTELS_LIST_VIEW__ID = config.templateConf.blog.hotelList.id;
    BIGGEST_ALLOWED_HOTEL_PG_NUMBER = config.routesConfig.maxHotelPgNum;
    MAX_NUM_OF_HOTEL_ITEMS_ON_PG = config.routesConfig.maxHotelListItemsCountOnPg;
    GET_HOTEL_LIST_VIEW__EP = config.restEndpoints.blog.hotelList.replace(/(.*)(\/:[a-zA-Z]+)/, '$1');

getHotelData = getHotelData({
    MAX_NUM_OF_HOTEL_ITEMS_ON_PG,
    BIGGEST_ALLOWED_HOTEL_PG_NUMBER
})
    
module.exports = getHotelListView;

function getHotelListView(req, res, next){
    let pageNumber = getPageNumber(req);

    Promise.all([
        getHotelData(pageNumber),
        getBlogNavLinks()
    ])
    .then((results) => {
        let paginationObjs = getPaginationObjs(pageNumber);
        renderHotelList(res, results, paginationObjs);
    })
    .catch(e => {
        next(e);
    });
}

function getPageNumber(req) {
    let requestedPageNum = req.params.pageNumber;
    let numberOfFirstPage = 1;

    let isPageNumber = /^[0-9]{1,2}$/.test(requestedPageNum);
    if (!isPageNumber) return numberOfFirstPage;

    requestedPageNum = parseInt(requestedPageNum);

    let isValidPageNumber = requestedPageNum <= BIGGEST_ALLOWED_HOTEL_PG_NUMBER;
        isValidPageNumber &= requestedPageNum !== 0;
    if (isValidPageNumber) {
        return requestedPageNum;
    } else if (requestedPageNum > BIGGEST_ALLOWED_HOTEL_PG_NUMBER) {
        return BIGGEST_ALLOWED_HOTEL_PG_NUMBER
    } else {
        return numberOfFirstPage
    }
}

function getPaginationObjs(currPagesNumber) {
    let paginationObjs = {};
    
    let isNotFirstPageRequested = currPagesNumber !== 0 && currPagesNumber !== 1;
    if (isNotFirstPageRequested) {
        let prevPagesNumber = currPagesNumber - 1
        let hotelItemsIndexOnPrevPage = prevPagesNumber * MAX_NUM_OF_HOTEL_ITEMS_ON_PG;
        paginationObjs.prevPageObj = {
            link : `${GET_HOTEL_LIST_VIEW__EP}/${prevPagesNumber}`,
            text : `${hotelItemsIndexOnPrevPage - MAX_NUM_OF_HOTEL_ITEMS_ON_PG} - ${hotelItemsIndexOnPrevPage}`
        };
    }
    
    let isNotLastPageRequested = currPagesNumber < BIGGEST_ALLOWED_HOTEL_PG_NUMBER;
    if (isNotLastPageRequested) {
        let nextPagesNumber = currPagesNumber + 1;
        let hotelItemsIndexOnNextPage = nextPagesNumber * MAX_NUM_OF_HOTEL_ITEMS_ON_PG;
    
        paginationObjs.nextPageObj = {
            link : `${GET_HOTEL_LIST_VIEW__EP}/${nextPagesNumber}`,
            text : `${hotelItemsIndexOnNextPage} - ${hotelItemsIndexOnNextPage + MAX_NUM_OF_HOTEL_ITEMS_ON_PG}`
        };
    }

    return paginationObjs;
}

function renderHotelList(res, results, paginationObjs) {
    res.locals.pageTitle = HOTELS_LIST_VIEW__TITLE;
    res.locals.pageId = HOTELS_LIST_VIEW__ID;
    res.locals.hotelItems = results[0];
    res.locals.navLinks = results[1];
    res.locals.paginationObjs = paginationObjs;

    res.render(HOTELS_LIST_VIEW__PATH);
}