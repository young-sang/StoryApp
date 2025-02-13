const express = require("express");
const path = require("path");
const cors = require("cors");
const db = require("./db");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello, Express with Mysql");
});

// api 엔드포인트
app.get("data/:mode", (req, res) => {
    res.json({message: "Hello from Express"});
});

// React 정적 파일 제공
app.use(express.static(path.join(__dirname, "../frontend/build")));

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/build", "index.html"));
});

// 서버 실행
app.listen(PORT, () => {
    console.log(`Server is running on http:/localhost:${PORT}`);
});
