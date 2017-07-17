var express = require('express');
var router = express.Router();
var db = require('../models/db');
/* GET home page. */
router.get('/', function (req, res, next) {
  console.log(7);
  res.render('receive', {
    req: req
   });
});


module.exports = router;
