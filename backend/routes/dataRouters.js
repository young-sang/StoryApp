const express = require('express');
const db = require('../db.js');
const router = express.Router();
const fs = require("fs");



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


router.put("/dbUpload", (req, res) => {
    const data = req.body;
    const filePath = `.${data.previmagePath}`;
    db.query(
        `UPDATE items SET name = ?, category = ?, image_path = ?, comment = ? WHERE id = ?`, [data.title, data.category, data.imagePath, data.comment, data.id], (error, result, fields) => {
            if(error){
                console.error(error);
                return;
            }
            
            const ratingValues = Object.entries(data.ratings).map(([key,value]) => {
                return new Promise((resolve, reject) => {
                    db.query(`UPDATE ratings SET rating_value = ? WHERE item_id = ? AND rating_item`, [value, data.id, key], (error, results, fields) => {
                        if(error){
                            console.error(error);
                            reject(error);
                        }
                        else{
                            resolve(result);
                        }
                    });
                });
            });
            Promise.all(ratingValues)
            .then(() => res.json(data.id))
            .then(() => {
                if(data.previmagePath){
                    fs.unlink(filePath, (err) => {
                        if(err){
                            console.error(err);
                            return;
                        }
                        console.log("파일이 성공적으로 삭제되었습니다.");
                    })
                }
            })
            .catch((err) => console.error(err));
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

router.delete("/delete/:id", (req, res) => {
    const id = req.params.id;
    const path = req.body.item;    
    const filePath = `.${path}`;
    db.query(`
        DELETE FROM ratings WHERE item_id = ?
        `, [id], (error, result, fields) => {
            if(error){
                console.error(error);
                return;
            }
            db.query(`
                DELETE FROM items WHERE id = ?
                `, [id], (error, result, fields) => {
                    if(error){
                        console.error(error);
                        return;
                    }
                    if(path){
                        fs.unlink(filePath, (err) => {
                            if(err){
                                console.error(err);
                                return;
                            }
                            console.log("파일이 성공적으로 삭제되었습니다.");
                        })
                    }
                    res.json({result: "success"});
                    console.log("데이터 삭제 성공");
                })
        })
})


module.exports = router;