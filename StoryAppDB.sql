create database storyappdb;

use storyappdb;

create table aniitems (
    id int auto_increment primary key,
    name varchar(50) not null,
    story int,
    worldview int,
    characters int,
    drawing int,
    ost int,
    production int,
    comment varchar(100)
)

create table mangaitems (
    id int auto_increment primary key,
    name varchar(50) not null,
    story int,
    worldview int,
    characters int,
    drawing int,
    production int,
    comment varchar(100)
)

create table novelitems (
    id int auto_increment primary key,
    name varchar(50) not null,
    story int,
    worldview int,
    characters int,
    comment varchar(100)
)

-- 테이블 컬럼 추가

-- ALTER TABLE 테이블명 ADD COLUMN 컬럼명 데이터타입;

ALTER TABLE users ADD COLUMN age INT;

-- 이미지 파일 저장 방법 / 파일을 서버에 저장하고 경로를 저장하는 방법 
CREATE TABLE images (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    file_path VARCHAR(500) NOT NULL
);


INSERT INTO images (name, file_path) 
VALUES ('example.png', '/var/www/images/example.png');

SELECT file_path FROM images WHERE id = 1;


-- 이미지 경로 컬럼 추가

ALTER TABLE novelitems ADD COLUMN image_path VARCHAR(255);

ALTER TABLE mangaitems ADD COLUMN image_path VARCHAR(255);

ALTER TABLE aniitems ADD COLUMN image_path VARCHAR(255);
