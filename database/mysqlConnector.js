var mysql = require('mysql2/promise');

const getConnection = async () => {
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'myc00lP4s5word',
        database: 'listr'
      });
      return connection;
}

module.exports = { getConnection };