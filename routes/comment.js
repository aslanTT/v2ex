var express = require('express');
var router = express.Router();
var db = require('../models/db')
/* GET home page. */
router.post("/", function(req, res, next) {
  db.table('comment').add({
    user_id: req.cookies.user_id,
    topic_id: req.body.topic_id,
    comment_content: req.body.content,
    date: new Date().toLocaleString()
  }).then(function () {
    return res.redirect('/topic/' + req.body.topic_id);
  }).catch(function (error) {
    return res.send(JSON.stringify({'message':'fail'}));
  });
});
module.exports = router;
