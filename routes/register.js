var express = require('express');
var router = express.Router();
var db = require('../models/db')
/* GET home page. */
router.get('/', function(req, res, next) {
  return res.render('register', {});
  next();
});
router.post('/', function (req, res, next) {
  var date = new Date().toLocaleString();
  var sql = 'insert into user(username,email,password,date) values(\"' +
            req.body.username + '\",\"' +
            req.body.email + '\",\"' +
            req.body.password + '\",\"' +
            date +
            '\")';
  db.operate(sql, function (error, data) {
    if (error) {
      return res.send(JSON.stringify({'message':'fail'}))
    }
    return res.render('login', {})
  });
})
module.exports = router;
