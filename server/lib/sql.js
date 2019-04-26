const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '1234qwer',
    database: 'BBS'
});

const promisePool = pool.promise();

const object = {
    async addUser(data) {
        const sql = "insert into user(nickname, gender, avatarUrl, city, country, province) values(?, ?, ?, ?, ?, ?) ";
        await promisrPool.query(sql, data);
    }
};

module.exports = object;
