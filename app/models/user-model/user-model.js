const dbPool = require('widgets/db-pool');
const bcrypt = require('bcryptjs');

let userModel = (() => {
    function insertUserSignupData(userSignupData) {
        let userId = dbPool.escape(userSignupData.userId);
        let name = dbPool.escape(userSignupData.name);
        let email = dbPool.escape(userSignupData.email);
        let salt = bcrypt.genSaltSync(10);
        let passwordHash = dbPool.escape(bcrypt.hashSync(userSignupData.password, salt));
        let avatarImgFileName = dbPool.escape(userSignupData.avatarImgFileName);

        sql = `insert into users (user_id, name, email, password_hash, avatar_img_file_name) values (${userId}, ${name}, ${email}, ${passwordHash}, ${avatarImgFileName});`;

        return new Promise((resolve, reject) => {
            dbPool.queryCb(sql, (err, results, fields) => {
                if (err) reject(err);
                resolve();
            });
        });
    }

    function getUserByEmail(email) {
        email = dbPool.escape(email);

        let sql = `SELECT user_id as userId, name, email, password_hash as passwordHash FROM users where users.email = ${email};`;

        return new Promise((resolve, reject) => {
            dbPool.queryCb(sql, (err, usersArr, fields) => {
                if (err) reject(err);

                let isUserWithCurrEmail = usersArr.length > 0;
                if (isUserWithCurrEmail) {
                    resolve(usersArr[0]);
                } else {
                    resolve(false);
                }
            });
        });    
    }

    return {
        insertUserSignupData,
        getUserByEmail
    }
})();

module.exports = userModel;



