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