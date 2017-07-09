var express = require('express');
var router = express.Router();
var db = require('../models/db')
/* GET home page. */
router.get('/', function(req, res, next) {
  return res.render('login', {});
  next();
});
router.post('/', function (req, res, next) {
  var options = {};
  var nodes = db.table('node').select();
  var topics = nodes.then(function (data) {
    options.nodes = data;
    return db.table('topic').select();
  })
  var user = topics.then(function (data) {
    options.topics = data;
    return db.table('user').where({
      email: req.body.email,
      password: req.body.password
    }).select();
  });
  user.then(function (data) {
    options.user = data[0];
    res.cookie('username', user.username);
    res.cookie('user_id', user.id);
    res.render('index',options);
  });
})

module.exports = router;
