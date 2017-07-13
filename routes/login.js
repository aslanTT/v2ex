var express = require('express');
var router = express.Router();
var db = require('../models/db')
/* GET home page. */
router.get('/', function(req, res, next) {
  return res.render('login', {});
  next();
});
router.post('/', function (req, res, next) {
  var options = {};
  db.table('user').where({
    email: req.body.email,
    password: req.body.password
  }).select()
  .then(function (data) {
    options.user = data[0];
    res.cookie('username', options.user.username, { maxAge: 900000, httpOnly: true });
    res.cookie('user_id', options.user.id, { maxAge: 900000, httpOnly: true });
    res.redirect('/');
  }).catch(function (error) {
    console.error(error);
  });
});

module.exports = router;
