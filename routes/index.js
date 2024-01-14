var express = require('express');
var router = express.Router();

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

router.get('/test', function(req, res, next) {
  res.set({
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Origin",
    "Access-Control-Allow-Methods": "POST, PUT, GET, OPTIONS, DELETE"
  });
  res.send("Hanky Spanky");
});

module.exports = router;
