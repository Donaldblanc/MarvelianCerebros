CREATE DATABASE marvel_db;

USE marvel_db;

CREATE TABLE table1(
    user VARCHAR(255),
    blog VARCHAR(255),
    comments VARCHAR(255),
    PRIMARY KEY (user)
);

CREATE TABLE table2(
    movies VARCHAR(255),
    figures VARCHAR(255),
    PRIMARY KEY (movies)
);