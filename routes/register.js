var express = require('express');
var router = express.Router();
var db = require('../models/db');
/* GET home page. */
router.get('/', function(request, res, next) {
  var req = {
    cookies:{
      user_id: 'false'
    }
  }
  if (request.hasOwnProperty('user_id')) {
    req = request
  }
  return res.render('register', {req: req});
  next();
});
router.post('/', function (req, res, next) {
  db.table('user').add({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    date: new Date().toLocaleString()
  }).then(function () {
    return res.redirect('/login');
  }).catch(function (error) {
    return res.send(JSON.stringify({'message':'fail'}));
  })
});
module.exports = router;
