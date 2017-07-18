var express = require('express');
var router = express.Router();
var db = require('../models/db')
/* GET home page. */
router.get('/node', function(req, res, next) {
  var options = {
    req: req
  };
  db.table('collection').join('node on collection.foreign_id = node.id').where({
    user_id: req.cookies.user_id
  }).select()
  .then(function (data) {
    options.nodeCollections = data;
    return res.render('nodeCollection', options);
  }).catch(function (error) {
    console.error(error);
  });
});

router.get('/node/:id', function(req, res, next) {
  var options = {
    req: req
  };
  db.table('collection').where({
    user_id: ['=', req.cookies.user_id],
    foreign_id: ['=', req.params.id]
  }).select()
  .then(function (data) {
    if (data.length === 0) {
      return db.table('collection').add({
        collection_type: 1,
        foreign_id: req.params.id,
        user_id: req.cookies.user_id,
        date: new Date().toLocaleString()
      });
    } else {
      return res.send(JSON.stringify({}));
    };
  })
  .then(function (data) {
    return db.table('collection').join('node on collection.foreign_id = node.id').where({
      user_id: req.cookies.user_id
    }).select();
  })
  .then(function (data) {
    options.nodeCollections = data;
    return res.render('nodeCollection', options);
  })
  .catch(function (error) {
    console.error(error);
  });
});

router.get('/node/:id/delete', function (req, res, next) {
  var options = {
    req: req
  };
  db.table('collection').where({
    user_id: ['=', req.cookies.user_id],
    foreign_id: ['=', req.params.id]
  }).delete()
  .then(function (data) {
    console.log(data);
    return res.redirect('/')
  })
  .catch(function (error) {
    console.error(error);
  });
});

module.exports = router;
