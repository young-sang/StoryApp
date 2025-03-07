const express = require('express');
const router = express.Router();

// 리스트 생성
router.get("/:mode", async (req, res) => {
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

router.post('/dbUpload', (req, res) => {
    console.log(req.body);
    console.log(1);
});

module.exports = router;