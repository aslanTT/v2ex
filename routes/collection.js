var express = require('express');
var router = express.Router();
var db = require('../models/db')
/* GET home page. */
router.get('/node', function(req, res, next) {
  var options = {
    req: req
  };
  db.table('collection').join('node on collection.foreign_id = node.id where collection.collection_type = 1 and collection.user_id = ' + req.cookies.user_id).select()
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
    foreign_id: ['=', 1],
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
    collection_type: 1,
    user_id: ['=', req.cookies.user_id],
    foreign_id: ['=', req.params.id]
  }).delete()
  .then(function (data) {
    console.log(data);
    return res.redirect('/collection/node')
  })
  .catch(function (error) {
    console.error(error);
  });
});

router.get('/topic', function (req, res, next) {
  var options = { req: req};
  db.table('collection').join('topic on collection.foreign_id = topic.topic_id where collection.collection_type = 2 and collection.user_id = ' + req.cookies.user_id).select()
  .then(function (data) {
    options.topicCollections = data;
    return res.render('topicCollection', options);
  })
  .catch(function (error) {
    console.error(error);
  })
});

router.get('/topic/:id', function(req, res, next) {
  var options = {
    req: req
  };
  db.table('collection').where({
    collection_type: 2,
    user_id: req.cookies.user_id,
    foreign_id: req.params.id
  }).select()
  .then(function (data) {
    if (data.length === 0) {
      return db.table('collection').add({
        collection_type: 2,
        foreign_id: req.params.id,
        user_id: req.cookies.user_id,
        date: new Date().toLocaleString()
      });
    } else {
      return res.send(JSON.stringify({}));
    };
  })
  .then(function (data) {
    return db.table('collection').join('topic on collection.foreign_id = topic.topic_id where collection.user_id = ' + req.cookies.user_id).select();
  })
  .then(function (data) {
    options.topicCollections = data;
    return res.redirect('/collection/topic');
  })
  .catch(function (error) {
    console.error(error);
  });
});

router.get('/topic/:id/delete', function (req, res, next) {
  var options = {
    req: req
  };
  db.table('collection').where({
    collection_type: 2,
    user_id: ['=', req.cookies.user_id],
    foreign_id: ['=', req.params.id]
  }).delete()
  .then(function (data) {
    console.log(data);
    return res.redirect('/collection/topic')
  })
  .catch(function (error) {
    console.error(error);
  });
});

module.exports = router;
