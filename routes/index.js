var express = require('express');
var router = express.Router();
var db = require('../models/db');
/* GET home page. */
router.get('/', function (req, res, next) {
  var options = { req: req };
  db.table('topic').join('user on topic.user_id = user.user_id').select()
  .then(function (data) {
    var topics = data;
    options.len = Math.ceil(topics.length / 10);
    options.topics = topics.slice(0,10);
    return res.render('index', options);
  }).catch(function (error) {
    console.error(error);
  });
});

router.get('/page/:page_id', function (req, res, next) {
  var options = {req: req};
  db.table('topic').join('user on topic.user_id = user.user_id').select()
  .then(function (data) {
    var topics = data;
    options.len = Math.ceil(topics.length / 10);
    options.topics = topics.slice(10*(req.params.page_id-1),10*req.params.page_id);
    return res.render('index', options);
  }).catch(function (error) {
    console.error(error);
  });
});

module.exports = router;
