DROP DATABASE IF EXISTS marvel_db;
CREATE DATABASE marvel_db;
USE marvel_db;
CREATE TABLE usersBlog(
    id int NOT NULL AUTO_INCREMENT,
    user VARCHAR(255),
    blog VARCHAR(255),
    comments VARCHAR(255),
    PRIMARY KEY (id)
);
CREATE TABLE movie(
    id int NOT NULL AUTO_INCREMENT,
    movies VARCHAR(255),
    primary key(id)
);
CREATE TABLE characters(
    id int NOT NULL AUTO_INCREMENT,
    character VARCHAR(255),
    movieID int, 
    FOREIGN KEY (movieID) REFERENCES movie(id)  
);