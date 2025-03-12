const express = require('express');
const db = require('../db.js');
const router = express.Router();



// Create
router.post('/dbUpload', (req, res) => {
    const data = req.body;
    console.log(data.category);
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
            db.query(
                `INSERT INTO mangaitems (name, story, worldview, characters, drawing, production, comment, image_path) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
                [data.title, data.story, data.worldview, data.characters, data.drawing, data.production, data.desc, data.imagePath],
                (error, results, fields) => {
                if(error) {
                    console.error(error);
                    return;
                }
                
            });
            break;
        case "novel":
            db.query(
                `INSERT INTO novelitems (name, story, worldview, characters, comment, image_path) VALUES (?, ?, ?, ?, ?, ?)`,
                [data.title, data.story, data.worldview, data.characters, data.desc, data.imagePath],
                (error, results, fields) => {
                if(error) {
                    console.error(error);
                    return;
                }
                
            });
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

// Read
router.get("/:mode", async (req, res) => {
    try{
        const mode = req.params.mode;
        
        //허용된 테이블 목록
        const allowedTables = ["aniitems", "mangaitems", "novelitems"];
        if(!allowedTables.includes(mode)){
            return res.status(400).json({error: "Invaild table name"});
        }


        db.query(`SELECT * FROM ${mode}`,(error, results, fields) => {
            if(error){
                console.error(err);
                return;
            }
            res.json(results);
        });
        
    } catch (err) {
        res.status(500).json({error: err.message});
    }
});


module.exports = router;