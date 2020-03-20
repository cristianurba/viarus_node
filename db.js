const mysql = require('mysql');

exports.connect = () => {
    const pool = mysql.createPool({

        host: '127.0.0.1',
        user: 'root',
        password: 'root',
        port: 8889,
        database: 'viarus'

    });

    global.db = pool;
}