const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();

const storage = multer.diskStorage({
    destination : (req, file, cb) => {
        cb(null, 'uploads/'); // 업로드 폴더
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // 파일명 설정
    }
});

const upload = multer({storage:storage});

// 파일 업로드 API
router.post('/imageUpload', upload.single('image'), (req, res) => {
    if(!req.file){
        return res.status(400).json({message: "파일이 업로드 되지 않습니다."});
    }
    res.json({filePath: `/uploads/${req.file.filename}`});
});

module.exports = router;