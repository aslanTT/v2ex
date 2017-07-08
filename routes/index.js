var express = require('express');
var router = express.Router();
var db = require('../models/db')
/* GET home page. */
router.get('/', function(req, res, next) {
  var sql = 'select * from node;';
  db.operate(sql, function (error, data) {
    if (error) {
      return res.send(JSON.stringify({'message':'fail'}));
    };
    return res.render('index', {
      user: req.cookies,
      nodes: data
    });
  });
});

module.exports = router;
