var express = require('express');
var router = express.Router();
var db = require('../models/db');

/* GET users listing. */
router.get('/', function(req, res, next) {
  var options = {
    username: req.cookies.username,
    nodes: [],
    topics: []
  };
  console.log(12,req.cookies.username);
  db.table('node').select()
  .then(function (data) {
    options.nodes = data;
    return db.table('topic').select();
  }).then(function (data) {
    options.topics = data;
    return res.render('user', { options: options });
  }).catch(function (error) {
    return res.send(JSON.stringify({'message':'fail'}))
  });
});

module.exports = router;
