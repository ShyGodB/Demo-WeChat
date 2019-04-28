const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '1234qwer',
    database: 'oil'
});

const promisePool = pool.promise();

const object = {
    async addUser(data) {
        const sql = "insert into user(nickname, gender, avatarUrl, city, country, province) values(?, ?, ?, ?, ?, ?)";
        await promisePool.query(sql, data);
    },

    async listAllUser() {
        const sql = "select * from user";
        const [rows, field] = await promisePool.query(sql);
	return rows;
    },

    async getUser(data) {
        const sql = "select * from user where id = ?";
        const [rows, field] = await promisePool.query(sql, data);
        return rows[0];
    },

    async updateCarSpend(data) {
        const sql = "update user set car_spend=? where id=?";
        await promisePool.query(sql, data);
    },

    async updatePrice(data) {
        const sql = "update user set price=? where id = ?";
        await promisePool.query(sql, data);
    }

};

module.exports = object;