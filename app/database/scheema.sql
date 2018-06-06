DROP DATABASE IF EXISTS marvel_db;

CREATE DATABASE marvel_db;

USE marvel_db;

CREATE TABLE usersBlog(
	id int NOT NULL AUTO_INCREMENT,
    user VARCHAR(255),
    blog LONGBLOB,
    comments BLOB,
    PRIMARY KEY (id)
);

CREATE TABLE movieCharacters(
    id int NOT NULL AUTO_INCREMENT,
    movies VARCHAR(255),
    characters VARCHAR(255),
    primary key(id)
);