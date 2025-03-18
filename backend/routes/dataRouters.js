const express = require('express');
const db = require('../db.js');
const router = express.Router();



// Create
router.post('/dbUpload', (req, res) => {
    const data = req.body;
    
    db.query(
        `INSERT INTO items (name, category, comment, image_path) VALUES (?,?,?,?)`, [data.title, data.category, data.comment, data.imagePath], (error, results, fields) => {
            if(error){
                console.error(error);
                return;
            }
            const lastInsertedId = results.insertId;
            
            const ratingValues = Object.entries(data.ratings).map(([key,value]) => [lastInsertedId, key, value]);
            

            db.query(`INSERT INTO ratings (item_id, rating_item, rating_value) VALUES ?`, [ratingValues], (error, results, fields) => {
                if(error){
                    console.error(error);
                }
                res.json(lastInsertedId);
            })
        }
    )
})

// Read
router.get("/list/:mode", async (req, res) => {
    try{
        const mode = req.params.mode;
        
        //허용된 테이블 목록
        const allowedTables = ["ani", "manga", "novel"];
        if(!allowedTables.includes(mode)){
            return res.status(400).json({error: "Invaild table name"});
        }

        db.query(`
            SELECT 
                i.id,
                i.name AS title,
                i.category,
                i.comment,
                i.image_path AS imagePath,
                CONCAT('{',
                    GROUP_CONCAT(
                        CONCAT('"', r.rating_item, '": ', r.rating_value)
                        SEPARATOR ', '
                    ),
                '}') AS ratings
            FROM items i
            LEFT JOIN ratings r ON i.id = r.item_id
            WHERE i.category = ?
            GROUP BY i.id, i.name, i.category, i.comment, i.image_path;
            `, [mode],(error, results, fields) => {
            if(error){
                console.error(error);
                return;
            }
            res.json(results);
        });
        
    } catch (err) {
        res.status(500).json({error: err.message});
    }
});




module.exports = router;