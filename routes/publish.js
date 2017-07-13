var express = require('express');
var router = express.Router();
var db = require('../models/db')
/* GET home page. */
router.get("/", function(req, res, next) {
  var node = db.table('node').select();
  node.then(function (data) {
    return res.render('publish', { nodes: data });
  }).catch(function (error) {
    return res.send(JSON.stringify({'message':'fail'}));
  });
});
router.post("/", function(req, res, next) {
  db.table('topic').add({
    user_id: req.cookies.user_id,
    node_id: req.body.node_id,
    title: req.body.title,
    content: req.body.content,
    date: new Date().toLocaleString()
  }).then(function () {
    return res.render('topic',{});
  }).catch(function (error) {
    return res.send(JSON.stringify({'message':'fail'}));
  });
});
module.exports = router;
