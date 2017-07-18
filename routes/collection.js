var express = require('express');
var router = express.Router();
var db = require('../models/db')
/* GET home page. */
router.get('/node', function(req, res, next) {
  res.redirect('/collection/node/page/1');
});

router.get('/node/:id', function(req, res, next) {
  var options = {
    req: req
  };
  db.table('collection').where({
    foreign_id: 1,
    user_id: req.cookies.user_id,
    foreign_id: req.params.id
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
    return res.redirect('/collection/node');
  })
  .catch(function (error) {
    console.error(error);
  });
});

router.get('/node/page/:page_id', function (req, res, next) {
  var options = { req: req };
  var page_id = req.params.page_id;
  var user_id = req.cookies.user_id;
  db.table('collection').join('node on collection.foreign_id = node.id where collection.collection_type = 1 and collection.user_id = ' + user_id).select()
  .then(function (data) {
    var nodeCollections = data;
    console.log(data);
    options.len = Math.ceil(nodeCollections.length / 5);
    options.nodeCollections = nodeCollections.slice(5*(page_id-1),5*page_id);
    return res.render('nodeCollection', options);
  }).catch(function (error) {
    console.error(error);
  })
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

router.get('/people', function (req, res, next) {
  var options = { req: req};
  db.table('collection').join('user on collection.foreign_id = user.user_id where collection.collection_type = 3 and collection.user_id = ' + req.cookies.user_id).select()
  .then(function (data) {
    options.peopleCollections = data;
    return res.render('peopleCollection', options);
  })
  .catch(function (error) {
    console.error(error);
  })
});

router.get('/people/:id', function(req, res, next) {
  var options = {
    req: req
  };
  db.table('collection').where({
    collection_type: 3,
    user_id: req.cookies.user_id,
    foreign_id: req.params.id
  }).select()
  .then(function (data) {
    if (data.length === 0) {
      return db.table('collection').add({
        collection_type: 3,
        foreign_id: req.params.id,
        user_id: req.cookies.user_id,
        date: new Date().toLocaleString()
      });
    } else {
      return res.send(JSON.stringify({}));
    };
  })
  .then(function (data) {
    return db.table('collection').join('user on collection.foreign_id = user.user_id where collection.user_id = ' + req.cookies.user_id).select();
  })
  .then(function (data) {
    options.topicCollections = data;
    return res.redirect('/collection/people');
  })
  .catch(function (error) {
    console.error(error);
  });
});

router.get('/people/:id/delete', function (req, res, next) {
  var options = {
    req: req
  };
  db.table('collection').where({
    collection_type: 3,
    user_id: ['=', req.cookies.user_id],
    foreign_id: ['=', req.params.id]
  }).delete()
  .then(function (data) {
    console.log(data);
    return res.redirect('/collection/people')
  })
  .catch(function (error) {
    console.error(error);
  });
});

module.exports = router;
