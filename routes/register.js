var express = require('express');
var router = express.Router();
var db = require('../models/db')
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('register', {});
  next();
});
router.post('/', function (req, res, next) {
  var date = new Date().toLocaleString();
  var sql = 'insert into user(username,email,password,date) values(' +
            req.form.username + ',' +
            req.form.email + ',' +
            req.form.password + ',' +
            date +
            ')';
  db.operate(sql, function (error, data) {
    res.
  });
})
module.exports = router;
