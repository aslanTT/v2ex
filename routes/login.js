var express = require('express');
var router = express.Router();
var db = require('../models/db')
/* GET home page. */
router.get('/', function(req, res, next) {
  return res.render('login', {});
  next();
});
router.post('/', function (req, res, next) {
  var user = 'select * from user where email=\"' + req.body.email +
            '\"';
  var nodes = 'select * from node;';
  db.operate(nodes, function (error, data) {
    if (error) {
      return res.send(JSON.stringify({'message':'fail'}));
    };
    nodes = data
    return null;
  });
  db.operate(user, function (error, data) {
    if (error) {
      return res.send(JSON.stringify({'message':'fail'}));
    };
    var user = data[0];
    res.cookie("username", user.username);
    res.cookie("user_id", user.id);
    return res.render('index',{
      user:user,
      nodes: nodes
    });
  });
})

module.exports = router;
