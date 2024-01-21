var express = require('express');
var router = express.Router();
var mysql = require('mysql2/promise');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// router.options('/test', function(req, res, next) {
//   res.set({
//     "Access-Control-Allow-Origin": "*",
//     "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Origin",
//     "Access-Control-Allow-Methods": "POST, PUT, GET, OPTIONS, DELETE"
//   });
//   res.send(200);
// })

// router.get('/test', function(req, res, next) {
//   res.set({
//     "Access-Control-Allow-Origin": "*",
//     "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Origin",
//     "Access-Control-Allow-Methods": "POST, PUT, GET, OPTIONS, DELETE"
//   });
//   connection.connect()

//   connection.query('SELECT * from listrTestTable', (err, rows, fields) => {
//     if (err) throw err;

//     console.log('The response is: ', rows[0].data);

//     res.send(rows[0].data);
//   })

//   connection.end()
// });


router.options('/createList', function(req, res, next) {
  res.set({
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Origin",
    "Access-Control-Allow-Methods": "POST, PUT, GET, OPTIONS, DELETE"
  });
  res.send(200);
})

router.post('/createList', async function(req, res, next) {
  res.set({
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Origin",
    "Access-Control-Allow-Methods": "POST, PUT, GET, OPTIONS, DELETE"
  });
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'myc00lP4s5word',
    database: 'listr'
  });

  connection.connect();

  try {
    const sql = "INSERT INTO lists (owner, name) values (1, 'Test List')";
    const [results, fields] = await connection.query(sql);
    console.log(results);
    console.log(fields);
    res.send(200);
    connection.end();
  } catch (err) {
    console.log(err);
    connection.end();
  }

});


module.exports = router;
