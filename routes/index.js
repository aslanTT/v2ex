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
  db.table('node').select()
  .then(function (data) {
    options.nodes = data;
    return db.table('topic').select();
  }).then(function (data) {
    options.topics = data;
    res.render('index', options);
  }).catch(function (error) {
    console.error(error);
  });
});

module.exports = router;
