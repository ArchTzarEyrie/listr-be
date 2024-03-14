var express = require('express');
var router = express.Router();
var sqlConnector = require('../database/mysqlConnector');

router.post('/create', async function(req, res) {
  const connection = await sqlConnector.getConnection();

  connection.connect();

  try {
    const sql = `INSERT INTO lists (owner, name) values ('${req.body.owner}, ${req.body.listName}')`;
    await connection.query(sql);
    res.sendStatus(200);
    connection.end();
  } catch (err) {
    console.log(err);
    connection.end();
  }
});

router.get('/:userId', async function(req, res) {
    const connection = await sqlConnector.getConnection();

    connection.connect();

    try {
        const sql = `SELECT * from lists where owner = ${req.params.userId}`;
        const [result, fields] = await connection.query(sql);
        res.send(result);
        connection.end();
    } catch (err) {
        res.send({errorMessage: err})
        console.log(err);
        connection.end();
    }
})

module.exports = router;
