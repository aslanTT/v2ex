var mysql = require("node-mysql-promise");
var db = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "root",
  database: "novelTalk",
  port: 3306
});
module.exports = db;
