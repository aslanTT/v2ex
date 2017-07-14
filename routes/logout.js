var express = require('express');
var router = express.Router();
var db = require('../models/db')
/* GET home page. */
router.get('/', function(req, res, next) {
  res.cookie('username', 'undefined', { maxAge: 9000000, httpOnly: true });
  res.cookie('user_id', 'undefined', { maxAge: 9000000, httpOnly: true });
  res.cookie('money', 'undefined', { maxAge: 9000000, httpOnly: true });
  return res.redirect('/login');
  next();
});

module.exports = router;
