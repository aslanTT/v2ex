var express = require('express');
var router = express.Router();
var db = require('../models/db');

/* GET users listing. */
router.get('/:id', function(req, res, next) {
  db.table('topic').join('user on topic.user_id = user.id where topic.user_id = ' + req.params.id).select()
  .then(function (data) {
    return res.render('user', { req: req, personalTopics: data });
  });
});

module.exports = router;
