const express = require("express");
const path = require("path");
const cors = require("cors");
const db = require("./db");

const dataRouter = require('./routes/dataRouters.js');
const uploadRouter = require('./routes/uploadRouter.js');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/data', dataRouter);
app.use('/upload', uploadRouter);



// React 정적 파일 제공
app.use(express.static(path.join(__dirname, "../frontend/build")));


// 서버 실행
app.listen(PORT, () => {
    console.log(`Server is running on http:/localhost:${PORT}`);
});

