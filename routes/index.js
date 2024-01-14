var express = require('express');
var router = express.Router();
const mysql = require('mysql2');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.options('/test', function(req, res, next) {
  res.set({
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Origin",
    "Access-Control-Allow-Methods": "POST, PUT, GET, OPTIONS, DELETE"
  });
  res.send(200);
})

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'myc00lP4s5word',
  database: 'listr'
})

router.get('/test', function(req, res, next) {
    res.set({
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Origin",
      "Access-Control-Allow-Methods": "POST, PUT, GET, OPTIONS, DELETE"
    });
    connection.connect()

    connection.query('SELECT * from listrTestTable', (err, rows, fields) => {
        if (err) throw err;

        console.log('The response is: ', rows[0].data);

        res.send(rows[0].data);
    })

    connection.end()
  });


module.exports = router;
