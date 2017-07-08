var express = require('express');
var router = express.Router();
var db = require('../models/db')
/* GET home page. */
router.get('/', function(req, res, next) {
  return res.render('login', {});
  next();
});
router.post('/', function (req, res, next) {
  var sql = 'select * from user where email=\"' + req.body.email +
            '\"';
  db.operate(sql, function (error, data) {
    if (error) {
      return res.send(JSON.stringify({'message':'fail'}));
    };
    return res.render('index',{user:data[0]});
  });
})

module.exports = router;
