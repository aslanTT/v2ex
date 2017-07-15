var express = require('express');
var router = express.Router();
var db = require('../models/db');
/* GET home page. */
router.get("/:id", function(req, res, next) {
  var options = {
    req: req,
    topic: {},
    comments: []
  }
  db.table('comment').join(
      'user on comment.user_id = user.user_id where comment.topic_id = '  + req.params.id,
      'join topic on comment.topic_id = topic.topic_id'
    ).select()
  .then(function (data) {
    options.comments = data;
    return db.table('topic').join('user on topic.user_id = user.user_id where topic.topic_id = ' + req.params.id).select();
  }).then(function (data) {
    options.topic = data[0];
    return res.render('topic', options);
  }).catch(function (error) {
    console.log(error);
  });

});

module.exports = router;
