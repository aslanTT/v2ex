var express = require('express');
var router = express.Router();
var db = require('../models/db');
/* GET home page. */
router.get('/', function (req, res, next) {
  db.table('user').where({
    id: req.cookies.user_id
  }).updateInc('money', 10)
  .then(function (data) {
    res.render('index', { req: req });
  }).catch(function (error) {
    console.log(error);
  });
});

module.exports = router;
