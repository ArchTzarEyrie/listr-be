var express = require('express');
var router = express.Router();
var sqlConnector = require('../database/mysqlConnector');

router.post('/create', async function(req, res) {
  const connection = await sqlConnector.getConnection();

  connection.connect();

  try {
    const sql = `INSERT INTO entries (content, creator, listId, link) values ('${req.body.content}, ${req.body.creator}, ${req.body.listId}, ${req.body.link}')`;
    await connection.query(sql);
    res.sendStatus(200);
    connection.end();
  } catch (err) {
    console.log(err);
    connection.end();
  }
});

module.exports = router;
