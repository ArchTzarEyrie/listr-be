var express = require('express');
var router = express.Router();
var sqlConnector = require('../database/mysqlConnector');

router.post('/createList', async function(req, res) {
  const connection = await sqlConnector.getConnection();
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
