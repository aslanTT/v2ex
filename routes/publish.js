var express = require('express');
var router = express.Router();
var db = require('../models/db')
/* GET home page. */
router.get("/", function(req, res, next) {
  var sql = 'select * from node;';
  db.operate(sql, function (error, data) {
    if (error) {
      return res.send(JSON.stringify({'message':'fail'}));
    };
    return res.render('publish', { nodes: data });
  });
});
router.post("/", function(req, res, next) {
  var date = new Date().toLocaleString();
  var sql = "insert into topic(user_id, node_id, title, content, date) values(\"" +
            req.cookies.user_id + "\",\"" +
            req.body.node_id + "\",\"" +
            req.body.title + "\",\"" +
            req.body.content + "\",\"" +
            date +
            "\")";
  db.operate(sql, function (error, data) {
    if (error) {
      return res.send(JSON.stringify({'message':'fail'}));
    };
    return res.render('topic',{});
  });
});
module.exports = router;
