const mysql = require("mysql2");
const dotenv = require("dotenv");

dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
//   port: process.env.DB_PORT,
//   waitForConnections: true,
//   connectionLimit: 10,
//   queueLimit: 0,
});

// 연결 테스트
pool.getConnection((err, connection) => {
  if(err){
    console.error("Database connection failed", err);
  } else {
    console.log("Connected to MySQL database");
    connection.release(); // 연결 해제
  }
})

module.exports = pool.promise(); // Promise 기반으로 변환
