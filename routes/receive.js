var express = require('express');
var router = express.Router();
var db = require('../models/db');
/* GET home page. */
router.get('/:id', function (req, res, next) {
  var options = { req: req };
  var user_id = req.params.id;
  db.table('message').join('user on message.receiver_id = user.user_id where user.user_id = ' + user_id).select()
  .then(function (data) {
    var message = data;
    options.len = Math.ceil(message.length / 5);
    options.message = message.slice(0,5);
    return db.table('user').where({
      user_id: user_id
    }).select();
  })
  .then(function (data) {
    options.user = data[0];
    return res.render('receive', options);
  }).catch(function (error) {
    console.error(error);
  });
});

router.get('/:id/page/:page_id', function (req, res, next) {
  var options = { req: req };
  var user_id = req.params.id;
  var page_id = req.params.page_id;
  db.table('message').join('user on message.receiver_id = user.user_id where user.user_id = ' + user_id).select()
  .then(function (data) {
    var message = data;
    options.len = Math.ceil(message.length / 5);
    options.message = message.slice(5*(page_id-1),5*page_id);
    return db.table('user').where({
      user_id: user_id
    }).select();
  })
  .then(function (data) {
    options.user = data[0];
    return res.render('receive', options);
  }).catch(function (error) {
    console.error(error);
  });
});


module.exports = router;
