var express = require('express');
var router = express.Router();
var db = require('../models/db');
/* GET home page. */
router.get('/:id', function (req, res, next) {
  var options = { req: req }
  db.table('node').where({
    id: req.params.id
  }).select()
  .then(function (data) {
    options.node = data[0];
    return db.table('topic').where({
      node_id: req.params.id
    }).select();
  })
  .then(function (data) {
    var topics = data;
    options.len = Math.ceil(topics.length / 10);
    options.topics = topics.slice(0,10);
    return res.render('node', options);
  }).catch(function (error) {
    console.log(error);
  });
});

router.get('/:id/page/:page_id', function (req, res, next) {
  var options = {req: req};
  db.table('node').where({
    id: req.params.id
  }).select()
  .then(function (data) {
    options.node = data[0];
    return db.table('topic').where({
      node_id: req.params.id
    }).select();
  })
  .then(function (data) {
    var topics = data;
    options.len = Math.ceil(topics.length / 10);
    options.topics = topics.slice(10*(req.params.page_id-1),10*req.params.page_id);
    return res.render('node', options);
  }).catch(function (error) {
    console.log(error);
  });
});

module.exports = router;
