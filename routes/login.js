var express = require('express');
var router = express.Router();
var db = require('../models/db')
/* GET home page. */
router.get('/', function(req, res, next) {
  return res.render('login', {req: req});
  next();
});
router.post('/', function (req, res, next) {
  db.table('user').where({
    email: req.body.email,
    password: req.body.password
  }).select()
  .then(function (data) {
    user = data[0];
    console.log(user);
    res.cookie('username', user.username, { maxAge: 9000000, httpOnly: true });
    res.cookie('user_id', user.id, { maxAge: 9000000, httpOnly: true });
    res.cookie('money', user.money, { maxAge: 9000000, httpOnly: true });
    res.redirect('/');
  }).catch(function (error) {
    console.error(error);
  });
});

module.exports = router;
