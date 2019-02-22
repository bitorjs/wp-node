var mysql = require('promise-mysql');

mysql.createConnection({
    host: 'localhost',
    user: 'sauron',
    password: 'theonetruering',
    database: 'mordor'
}).then(function (conn) {
    var result = conn.query('select `name` from hobbits');
    conn.end();
    return result;
}).then(function (rows) {
    // Logs out a list of hobbits
    console.log(rows);
});