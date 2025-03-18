create database storyappdb;

use storyappdb;


-- 관계형 DB로 수정

-- 데이터 수정
CREATE TABLE items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    category ENUM('ani', 'manga', 'novel') NOT NULL,
    comment VARCHAR(100),
    image_path VARCHAR(255),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP 
);

CREATE TABLE ratings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    item_id INT,
    rating_item ENUM('story', 'worldview', 'characters', 'drawing', 'ost', 'production') NOT NULL,
    rating_value INT CHECK (rating_value BETWEEN 0 AND 10),
    FOREIGN KEY (item_id) REFERENCES items(id) ON DELETE CASCADE
);

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
WHERE i.id = 120
GROUP BY i.id, i.name, i.category, i.comment, i.image_path;