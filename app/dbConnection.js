var mysql = require('mysql');
var config = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'pruebadeingreso',
    port: 3306
};

const pool = mysql.createPool(config);
module.exports = pool;