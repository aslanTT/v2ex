var express = require('express');
var router = express.Router();
var db = require('../models/db');
/* GET home page. */
router.get("/:id", function(req, res, next) {
  db.table('topic').where({
    id: req.params.id
  }).select()
  .then(function (data) {
    return res.render('topic', {
      topic: data[0],
      req: req
     });
  }).catch(function (error) {
    return res.send(JSON.stringify({'message':'fail'}))
  });
});

module.exports = router;
