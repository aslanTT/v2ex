var express = require('express');
var router = express.Router();
var db = require('../models/db');

/* GET users listing. */
router.get('/:id', function(req, res, next) {
  var options = {
    req: req
  };
  db.table('topic').join('user on topic.user_id = user.user_id where topic.user_id = ' + req.params.id).select()
  .then(function (data) {
    var topics = data;
    options.len = Math.ceil(topics.length / 5);
    options.personalTopics = topics.slice(0,5);
    return db.table('user').where({
      user_id: req.params.id
    }).select();
  }).then(function (data) {
    options.user = data[0];
    return res.render('user', options);
  }).catch(function (error) {
    console.error(error);
  });
});

router.get('/:id/page/:page_id', function (req, res, next) {
  var options = {
    req: req
  };
  db.table('topic').join('user on topic.user_id = user.user_id where topic.user_id = ' + req.params.id).select()
  .then(function (data) {
    var topics = data;
    options.len = Math.ceil(topics.length / 5);
    options.personalTopics = topics.slice(5*(req.params.page_id-1),5*req.params.page_id);
    return db.table('user').where({
      user_id: req.params.id
    }).select();
  }).then(function (data) {
    options.user = data[0];
    return res.render('user', options);
  }).catch(function (error) {
    console.error(error);
  });
});

module.exports = router;
