require("dotenv").config();
import express from 'express';
const router = express.Router();
import fetch from 'node-fetch';
import marvelAPi from '../model/marvelApi';
import moviesAPi from '../model/moviesApi';


//first route taken once page is opened, function only gets a callback no query needed here
router.get("/movies", (request, response) => {
    moviesAPi.getMovies(function (results) {
        // console.log("Movie information: " + results)
        console.log('hit');
        response.json(results);
    });
});
router.get("/movieCharacters/:characters", (request, response) => {
    let movieChar = request.params.characters;
    console.log("Movie in apicall: " + movieChar)
    moviesAPi.getCharacters(movieChar, function (results) {
        // console.log(results)
        response.json(results);
    });
});

router.get("/comics/:comicId?", (request, response) => {

    let comic = request.params.comicId;
    //console.log(comic);
    if (comic != null) {
        marvelAPi.comics(comic, function (results) {
            // console.log("comics results: " + results) 
            response.json(results);
        });

    }
    else {
        marvelAPi.comics('1009351', function (results) {
            // console.log("comics results: " + results) 
            response.json(results);
        });
    }
});

export default router;
