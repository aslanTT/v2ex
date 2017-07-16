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
    options.personalTopics = data;
    return db.table('user').where({
      user_id: req.params.id
    }).select();
  }).then(function (data) {
    options.user = data[0]
    return res.render('user', options);
  });
});

module.exports = router;
