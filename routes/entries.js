var express = require('express');
var router = express.Router();
var sqlConnector = require('../database/mysqlConnector');

router.post('/create', async function(req, res) {
  const connection = await sqlConnector.getConnection();

  connection.connect();

  try {
    const sql = `INSERT INTO entries (content, creator, listId, link) values ('${req.body.content}', ${req.body.creator}, ${req.body.listId}, '${req.body.link}')`;
    const [result, fields] = await connection.query(sql);
    res.send({insertId: result.insertId});
  } catch (err) {
    console.log(err);
  }
  connection.end();
});

router.get('/:listId', async function(req, res) {
  const connection = await sqlConnector.getConnection();

  connection.connect();

  try {
    const sql = `SELECT * FROM entries WHERE listId = ${req.params.listId}`;
    const [rows, fields] = await connection.query(sql);
    const sql2 = `SELECT name from lists WHERE id = ${req.params.listId}`;
    const [rows2, fields2] = await connection.query(sql2);
    res.send({rows, listName: rows2[0].name});
  } catch (err) {
    console.log(err);
  }
  connection.end();
});

router.put('/update/:entryId', async function(req, res) {
  const connection = await sqlConnector.getConnection();

  connection.connect();

  try {
    const sql = `UPDATE entries SET content = '${req.body.content}', link = '${req.body.link}' WHERE id = ${req.params.entryId} LIMIT 1`;
    const [result, fields] = await connection.query(sql);
    res.send({insertId: result.insertId});
  } catch (err) {
    console.log(err);
  }
  connection.end();
});

router.delete('/:entryId', async function(req, res) {
  const connection = await sqlConnector.getConnection();

  connection.connect();

  try {
    const sql = `DELETE from entries WHERE id = ${req.params.entryId} LIMIT 1`;
    const [result, fields] = await connection.query(sql);
    if (result.affectedRows === 1) {
      res.sendStatus(200);
    } else {
      res.send({errorMessage: 'Entry not deleted from database'});
    }
  } catch (err) {
    console.log(err);
    res.send({errorMessage: 'Unknown delete error, check server logs'});
  }
  connection.end();
})

module.exports = router;
