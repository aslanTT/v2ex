var mysql = require("node-mysql-promise");
var db = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "root",
  database: "novelTalk",
  port: 3306
});
// var handle = {
//   operate: function (sql, callback) {
//     pool.getConnection(function (error, connection) {
//       if (error) {
//         return callback(true);
//       };
//       connection.query(sql, function (error, results, fileds) {
//         connection.release();
//         if (error) {
//           return callback(true);
//         };
//         return callback(false, results);
//       });
//     });
//   }
// };
module.exports = db;
