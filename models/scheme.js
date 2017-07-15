var db = require('./db');

var user = 'create table user (' +
          'id int auto_increment,' +
          'username varchar(255),' +
          'password varchar(255),' +
          'email varchar(255),' +
          'sex varchar(255),' +
          'date varchar(255),' +
          'userlogo varchar(255),' +
          'money int default 0,' +
          'lastLoginDate varchar(255),' +
          'primary key(id)' +
          ');';

var topic = 'create table topic(' +
          'id int auto_increment,' +
          'user_id int,' +
          'node_id int,' +
          'title varchar(255),' +
          'topic_content text,' +
          'clicks int,' +
          'date varchar(255),' +
          'primary key(id)' +
          ');';

var comment = 'create table comment(' +
          'id int auto_increment,' +
          'user_id int,' +
          'topic_id int,' +
          'comment_content text,' +
          'date varchar(255),' +
          'primary key(id)' +
          ');';

var node = 'create table node(' +
          'id int auto_increment,' +
          'name varchar(255),' +
          'date varchar(255),' +
          'primary key(id)' +
          ');';

var message = 'create table message(' +
              'id int auto_increment,' +
              'receiver_id int,' +
              'sender_id int,' +
              'title varchar(255),' +
              'message_content text,' +
              'date varchar(255),' +
              'primary key(id)' +
              ');';

var sql = topic
console.log(sql);
db.execute(sql).then(function (data) {
  console.log(data);
}).catch(function (error) {
  console.log(error);
});
