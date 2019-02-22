const dbPool = require('widgets/db-pool');
const bcrypt = require('bcryptjs');

let userModel = (() => {
    function insertUserSignupData(userSignupData) {
        let userId = dbPool.escape(userSignupData.userId);
        let name = dbPool.escape(userSignupData.name);
        let email = dbPool.escape(userSignupData.email);
        let salt = bcrypt.genSaltSync(10);
        let tmpPasswordHash = dbPool.escape(bcrypt.hashSync(userSignupData.tmpPwd, salt));
        let privilage = dbPool.escape(userSignupData.privilage);
        let tmpPasswordExpiry = dbPool.escape(userSignupData.tmpPwdExpiry);
        //let avatarImgFileName = dbPool.escape(userSignupData.avatarImgFileName);

        sql = ''
            + 'use users;\n'
            + 'insert into users (user_id, name, email, privilage)\n'
            + `values (${userId}, ${name}, ${email}, ${privilage});\n`

            + 'insert into temporary_passwords (user_id, tmp_password_hash, tmp_password_expiry)\n'
            + `values (${userId}, ${tmpPasswordHash}, ${tmpPasswordExpiry});`

        return dbPool.queryProm(sql);
    }
    
    function checkIfEmailIsTaken(currEmail) {
        currEmail = dbPool.escape(currEmail);
        
        let sql = ''
        + 'use users;\n'
        + 'select if(count(email) > 0, true, false) as isEmailTaken\n'
        + `FROM users where email = ${currEmail};`;

        return new Promise((resolve, reject) => {
            dbPool.queryCb(sql, (err, results, fields) => {
                try {
                    if (err) return reject(err);
                    let isEmailTaken = Boolean(results[1][0].isEmailTaken)
                    resolve(isEmailTaken);
                } catch (err) {
                    reject(err)
                }
            });
        });    
    }

    function getUserByEmail(email) {
        email = dbPool.escape(email);

        let sql = '' 
            + 'use users;\n'
            + `SELECT user_id as userId, name, email, password_hash as passwordHash, privilage FROM users\n`
            + `where users.email = ${email};`;

        return new Promise((resolve, reject) => {
            dbPool.queryCb(sql, (err, results, fields) => {
                if (err) return reject(err);

                let isUserWithCurrEmail = results[1].length > 0;
                if (isUserWithCurrEmail) {
                    resolve(results[1][0]);
                } else {
                    resolve(false);
                }
            });
        });    
    }

    function getUserById(userId) {
        userId = dbPool.escape(userId);

        let sql = '' 
            + 'use users;\n'
            + `SELECT user_id as userId, name, email, password_hash as passwordHash, privilage FROM users\n`
            + `where user_id = ${userId};`;

        return new Promise((resolve, reject) => {
            dbPool.queryCb(sql, (err, results, fields) => {
                if (err) return reject(err);

                let isUserWithCurrEmail = results[1].length > 0;
                if (isUserWithCurrEmail) {
                    resolve(results[1][0]);
                } else {
                    resolve(false);
                }
            });
        });    
    }

    function getUserWithTmpPwdByEmail(email) {
        email = dbPool.escape(email);

        let sql = '' 
            + 'use users;\n'
            + 'select\n' 
                + 'users.email,\n' 
                + 'users.name,\n' 
                + 'users.user_id as userId,\n'
                + 'temporary_passwords.tmp_password_hash as tmpPasswordHash,\n'
                + 'temporary_passwords.tmp_password_expiry as tmpPasswordExpiry\n'
            + 'from users inner join temporary_passwords\n'
                + 'on users.user_id = temporary_passwords.user_id\n'
                + `and users.email = ${email};\n`;
                
        return new Promise((resolve, reject) => {
            dbPool.queryProm(sql)
            .then(results => {
                let userDataObj = results[0];
                resolve(userDataObj)
            })
            .catch(err => {
                reject(err);
            });
        });
    }

    function getAllUsers() {
        sql = ''
            + 'use users;\n'
            + 'select user_id as userId, name, email, user_created_at as createdAt from users;';

        return dbPool.queryProm(sql);
    }

    function deleteUserFromDb(userId) {
        userId = dbPool.escape(userId);

        sql = ''
            + 'use users;\n'
            + `delete from users where user_id = ${userId};`;

        return dbPool.queryProm(sql);
    }

    function updatePasswordByUserId(userId, newPassword) {
        userId = dbPool.escape(userId);

        let salt = bcrypt.genSaltSync(10);
        newPasswordHash = dbPool.escape(bcrypt.hashSync(newPassword, salt));

        sql = ''
            + 'use users;\n'
            + `update users set password_hash = ${newPasswordHash}\n`
            + `where user_id = ${userId};\n`

            + `delete from temporary_passwords where user_id = ${userId};`

        return dbPool.queryProm(sql);
    }

    return {
        insertUserSignupData,
        getUserByEmail,
        checkIfEmailIsTaken,
        getAllUsers,
        deleteUserFromDb,
        getUserWithTmpPwdByEmail,
        updatePasswordByUserId,
        getUserById
    }
})();

module.exports = userModel;