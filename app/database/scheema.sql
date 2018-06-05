CREATE DATABASE marvel_db;

USE marvel_db;

CREATE TABLE usersBlog(
	id int NOT NULL AUTO_INCREMENT,
    user VARCHAR(255),
    blog LONGBLOB,
    comments BLOB,
    PRIMARY KEY (id)
);

CREATE TABLE table2(
    movies VARCHAR(255),
    figures VARCHAR(255),
    PRIMARY KEY (movies)
);