var mysql = require("mysql");
var pool = mysql.createPool({
  host: "127.0.0.1",
  user: "root",
  password: "root",
  database: "ncu",
  port: 3306
});
var handle = {
  operate: function (sql, callback) {
    pool.getConnection(function (error, connection) {
      if (error) {
        callback(true);
        return ;
      };
      connection.query(sql, function (error, results, fileds) {
        connection.release();
        if (error) {
          callback(true);
          return ;
        };
        callback(false, results)
      });
    })
  }
};
module.exports = handle;
