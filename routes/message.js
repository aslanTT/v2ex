var express = require('express');
var router = express.Router();
var db = require('../models/db');
/* GET home page. */
router.get('/:id', function (req, res, next) {
  var receiver_id = req.params.id;
  res.render('message', {
    req: req,
    receiver: receiver_id
   });
});

router.post('/', function (req, res, next) {
  db.table('message').add({
    receiver_id: req.body.receiver,
    sender_id: req.cookies.user_id,
    title: req.body.title,
    message_content: req.body.content,
    date: new Date().toLocaleString()
  }).then(function (data) {
    res.redirect('/');
  }).catch(function (error) {
    console.log(error);
  });
});


module.exports = router;
