var express = require('express');
var router = express.Router();
var db = require('../models/db')
/* GET home page. */
router.get('/', function(req, res, next) {
  var sql = "select * from user"
  db.operate(sql, function (error, data) {
    console.log(data);
    res.render('index', { title: 'Express' });
  });
});

module.exports = router;
