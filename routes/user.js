var express = require('express');
var router = express.Router();
var db = require('../models/db');

/* GET users listing. */
router.get('/', function(req, res, next) {
  var options = {
    req: req,
    nodes: [],
    topics: []
  };
  db.table('node').select()
  .then(function (data) {
    options.nodes = data;
    return db.table('topic').select();
  }).then(function (data) {
    options.topics = data;
    return res.render('user', options);
  }).catch(function (error) {
    return res.send(JSON.stringify({'message':'fail'}))
  });
});

module.exports = router;
