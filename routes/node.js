var express = require('express');
var router = express.Router();
var db = require('../models/db');
/* GET home page. */
router.get('/:id', function (req, res, next) {
  var options = { req: req }
  db.table('node').where({
    id: req.params.id
  }).select()
  .then(function (data) {
    options.node = data[0];
    return db.table('topic').where({
      node_id: req.params.id
    }).select();
  })
  .then(function (data) {
    options.topics = data;
    return res.render('node', options);
  }).catch(function (error) {
    console.log(error);
  })
});

module.exports = router;
