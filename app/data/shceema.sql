CREATE DATABASE marvel_db;

USE marvel_db;

CREATE TABLE usersBlog(
    user VARCHAR(255),
    blog VARCHAR(255),
    comments VARCHAR(255),
    PRIMARY KEY (user)
);

CREATE TABLE movieCharacters(
    movies VARCHAR(255),
    characters VARCHAR(255),
    PRIMARY KEY (movies)
);