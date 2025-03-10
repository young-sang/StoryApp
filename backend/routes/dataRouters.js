const express = require('express');
const db = require('../db.js');
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
        res.json(rows);
    } catch (err) {
        res.status(500).json({error: err.message});
    }
});

router.post('/dbUpload', (req, res) => {
    const data = req.body;

    switch(data.category){
        case "ani":
            db.query(
                `INSERT INTO aniitems (name, story, worldview, characters, drawing, ost, production, comment, image_path) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                [data.title, data.story, data.worldview, data.characters, data.drawing, data.ost, data.production, data.desc, data.imagePath],
                (error, results, fields) => {
                if(error) {
                    console.error(error);
                    return;
                }
                
            });
            break;
        case "manga":
            break;
        case "novel":
            break;
    }
    
    db.query("SELECT * FROM aniitems", (error, results, fields) => {
        if(error) {
            console.error(error);
            return;
        }
        console.log(results);
    });
});

module.exports = router;