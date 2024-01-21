var express = require('express');
var router = express.Router();
var mysql = require('mysql2/promise');

router.use((req, res, next) => {
  res.set({
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Origin",
    "Access-Control-Allow-Methods": "POST, PUT, GET, OPTIONS, DELETE"
  });
  next();
});

router.post('/createList', async function(req, res, next) {
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'myc00lP4s5word',
    database: 'listr'
  });

  connection.connect();
  console.log(req.body);

  try {
    const sql = `INSERT INTO lists (owner, name) values (1, '${req.body.listName}')`;
    await connection.query(sql);
    res.sendStatus(200);
    connection.end();
  } catch (err) {
    console.log(err);
    connection.end();
  }

});


module.exports = router;
