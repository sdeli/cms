const hotelsModel = require('models/hotels-model');

module.exports = ((config) => {
    const {
        MAX_NUM_OF_HOTEL_ITEMS_ON_PG,
    } = config;

    return getHotelData;
    
    function getHotelData(pageNumber) {
        let startIndex = getStartIndex(pageNumber);
        
        return new Promise((resolve, reject) => {
            hotelsModel.getHotelData(startIndex, MAX_NUM_OF_HOTEL_ITEMS_ON_PG)
            .then(hotelItems => {
                attachWebsiteLinkViews(hotelItems)
                resolve(hotelItems);
            })
            .catch(err => {
                reject(err);
            })
            
        });
    }

    function getStartIndex(pageNumber) {
        let isFirstPageRequested = pageNumber === 0 || pageNumber === 1;
        let startIndex = isFirstPageRequested ? 0 : (pageNumber - 1) * MAX_NUM_OF_HOTEL_ITEMS_ON_PG;

        return startIndex;
    }
    
    function attachWebsiteLinkViews(hotelItems) {
        let maxLengthOfHotelLink = 34;
    
        hotelItems.forEach(hotelItem => {
            let isLinkTooLong = hotelItem.websiteUrl.length > maxLengthOfHotelLink;
            if (isLinkTooLong) {
                hotelItem.websiteLinkView = `${hotelItem.websiteUrl.substr(0, maxLengthOfHotelLink)}. . . .`;
            } else {
                hotelItem.websiteLinkView = hotelItem.websiteUrl;
            }
        });
    }    
});