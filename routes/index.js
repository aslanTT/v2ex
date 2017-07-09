var express = require('express');
var router = express.Router();
var db = require('../models/db')
/* GET home page. */
router.get('/', function (req, res, next) {
  var options = {
    user: req.cookies,
    nodes: [],
    topics: []
  };
  var nodes = db.table('node').select();
  var topics = nodes.then(function (data) {
    options.nodes = data;
    return db.table('topic').select();
  })
  topics.then(function (data) {
    options.topics = data;
    res.render('index', options);
  });
});

module.exports = router;
