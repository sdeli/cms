// const config = require('config');
const dbPool = require('widgets/db-pool');

const hotelsModel = (() => {
    function getHotelData(startIndex, rowCount) {
        let sql = ''
        + 'use hotel_data_db;\n'

        + 'select\n'
            + 'hotels.hotel_name as hotelName,\n'
            + 'hotel_webistes.website_url as websiteUrl,\n'
            + 'hotel_addr.full_addr as fullAddr\n'
        + 'from hotels inner join websites_of_hotels\n'
        + 'on hotels.hotel_id = websites_of_hotels.hotel_id\n'
        
        + 'inner join hotel_webistes\n'
        + 'on websites_of_hotels.website_id = hotel_webistes.website_id\n'
        
        + 'and exists(select emails_of_websites.website_id from emails_of_websites\n'
                + 'where hotel_webistes.website_id = emails_of_websites.website_id)\n'
                
        + 'inner join hotel_addr\n'
        + 'on hotels.hotel_id = hotel_addr.hotel_id\n'
        
        + `limit ${startIndex}, ${rowCount};`

        return new Promise((resolve, reject) => {
            dbPool.queryCb(sql, (err, results, fields) => {
                try {
                    if (err) {
                        reject(err);
                        return;
                    } else {
                        let hotelItems = results[1];
                        resolve(hotelItems);
                    }
                } catch (err) {
                    reject(err)
                }
            });
        });
    }

    return {
        getHotelData
    }
})();

module.exports = hotelsModel

