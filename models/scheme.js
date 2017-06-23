var db = require('./db');

var sql = 'create table user (' +
          'id int auto_increment,' +
          'username varchar(255),' +
          'password varchar(255),' +
          'email varchar(255),' +
          'sex varchar(255),' +
          'joinDate varchar(255),' +
          'userlogo varchar(255),' +
          'primary key(id)' +
          ');';

var sql = 'create table topic(' +
          'id int auto_increment,' +
          'user_id int,' +
          'node_id int,' +
          'title varchar(255),' +
          'content text,' +
          'clicks int,' +
          'date varchar(255),' +
          'primary key(id)' +
          ');';

var sql = 'create table comment(' +
          'id int auto_increment,' +
          'user_id int,' +
          'topic_id int,' +
          'content text,' +
          'date varchar(255),' +
          'primary key(id)' +
          ');';

var sql = 'create table node(' +
          'id int auto_increment,' +
          'name varchar(255),' +
          'date varchar(255),' +
          'primary key(id)' +
          ');';

db.operate(sql, function (error, data) {
  if (error) {
    return ;
  }
  return ;
});
