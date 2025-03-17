const express = require('express');
const db = require('../db.js');
const router = express.Router();



// Create
router.post('/dbUpload', (req, res) => {
    const data = req.body;
    
    db.query(
        `INSERT INTO items (name, category, comment, image_path) VALUES (?,?,?,?)`, [data.title, data.category, data.desc, data.imagePath], (error, results, fields) => {
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


        // db.query(`SELECT * FROM ${mode}`,(error, results, fields) => {
        //     if(error){
        //         console.error(error);
        //         return;
        //     }
        //     res.json(results);
        // });

        db.query(`SELECT * FROM items WHERE category = ?`, [mode],(error, results, fields) => {
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


router.get("/single/:mode/:id", async (req, res) => {
    try{
        const mode = req.params.mode;
        const id = req.params.id;
        
        //허용된 테이블 목록
        const allowedTables = ["ani", "manga", "novel"];
        if(!allowedTables.includes(mode)){
            return res.status(400).json({error: "Invaild table name"});
        }


        db.query(`SELECT * FROM items WHERE id=?`, [id],(error, results, fields) => {
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