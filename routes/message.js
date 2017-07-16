var express = require('express');
var router = express.Router();
var db = require('../models/db');
/* GET home page. */
router.get('/:id', function (req, res, next) {
  res.render('message', {
    req: req,
    reciever: req.params.id
   });
});

router.post('/', function (req, res, next) {
  db.table('message').add({
    receiver_id: req.body.reciever,
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
