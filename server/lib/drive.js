const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '1234qwer',
    database: 'oil'
});

const promisePool = pool.promise();

const object = {

    async addTripRecord(data) {
        const sql = "insert into record_driving(user_id, price, amount, trip, cost) values(?, ?, ?, ?, ?)";
        await promisePool.query(sql, data);
    },

};

module.exports = object;
