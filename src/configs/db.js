require("dotenv").config()

const mysql = require("mysql")

const conn = mysql.createConnection({
  host: process.env.DB_HOST || "db4free.net",
  user: process.env.DB_USER || "zeref_weismann",
  password: process.env.DB_PASSWORD || "Natsu001",
  database: process.env.DB_NAME || "rent_book"
})
conn.connect(function(err) {
  if (err) throw err
})

// conn.connect(function (err) {
//     if (err) {
//         return console.error('error: ' + err.message);
//     }

//     console.log('Connected to the MySQL server.');
// });
module.exports = conn
