const mysql = require("mysql2");
const dotenv = require("dotenv");

dotenv.config();

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// 연결 테스트
connection.connect((err) => {
  if(err) {
    console.error(err);
    return;
  }
  console.log('데이터베이스 연설 성공');
});

// connection.query("SELECT * FROM aniitems", (error, results, fields) => {
//     if(error) {
//         console.error(error);
//         return;
//     }
//     // console.log(results);
// });

module.exports = connection; // Promise 기반으로 변환
