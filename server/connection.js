const mysql = require("mysql");
const connection = mysql.createConnection({
  host: "localhost",
  port: "3306",
  user: "root",
  database: "exercise2",
  password: "12345678",
});
connection.connect((error) => {
  if (error) {
    console.log(error);
  } else {
    console.log("conect successfull");
  }
});
module.exports = connection;
