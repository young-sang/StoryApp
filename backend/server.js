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
app.get("/data/:mode", async (req, res) => {
    try{
        const mode = req.params.mode;

        //허용된 테이블 목록
        const allowedTables = ["aniitems", "mangaitems", "novelitems"];
        if(!allowedTables.includes(mode)){
            return res.status(400).json({error: "Invaild table name"});
        }

        // 안전한 방식으로 SQL 실행
        const [rows] = await db.query(`SELECT * FROM ${mode}`);
        console.log(rows);
        res.json(rows);
    } catch (err) {
        res.status(500).json({error: err.message});
    }
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

// app.put("/users/:id", async (req, res) => {
//     try {
//         const { name, email } = req.body;
//         const [result] = await db.query("UPDATE users SET name = ?, email = ? WHERE id = ?", [name, email, req.params.id]);
//         if (result.affectedRows === 0) return res.status(404).json({ message: "User not found" });
//         res.json({ message: "User updated" });
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// });

// app.delete("/users/:id", async (req, res) => {
//     try {
//         const [result] = await db.query("DELETE FROM users WHERE id = ?", [req.params.id]);
//         if (result.affectedRows === 0) return res.status(404).json({ message: "User not found" });
//         res.json({ message: "User deleted" });
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// });
