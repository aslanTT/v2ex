var express = require('express');
var router = express.Router();
var db = require('../models/db')
/* GET home page. */
router.get('/', function(req, res, next) {
  res.cookie('username', 'false', { maxAge: 9000000, httpOnly: true });
  res.cookie('user_id', 'false', { maxAge: 9000000, httpOnly: true });
  res.cookie('money', '0', { maxAge: 9000000, httpOnly: true });
  return res.render('login', {req: req});
  next();
});

module.exports = router;
