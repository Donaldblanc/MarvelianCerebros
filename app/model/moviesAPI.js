
import fetch from 'node-fetch';
import marvelAPi from '../model/marvelApi'


var controller = require("../data/controller.js");//import movies object from data folder
const movieInfo = [];
const charactersID = [];
let moviesApi = {
    getMovies: function (cb) {

        controller.allMovies(function (result) {
            // console.log("DATA INSIDE moviesApi.js file :");
            // console.log(result);
            // console.log(result.length);
            // console.log("FROM MOVIES JS: "+res);
            for (let i = 0; i < result.length; i++) {
                // let movieName = "Spider-Man"
                let movieName = result[i].movies.toString();
                let queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";
                fetch(queryUrl)
                    .then(response => response.json())
                    .catch(error => console.error('Error:', error))
                    .then(function (response) {

                        movieInfo.push(response.Poster);
                        if (movieInfo.length === result.length) {
                            cb(movieInfo)
                        }
                    })
            }

        })

    },
    getCharacters: function (movie, cb) {

        controller.allCharacters(movie, function (result) {
            // console.log(result);
            for (let i = 0; i < result.length; i++) {
                // let movieName = "Spider-Man"
                let characterName = result[i].movie_character.toString();
                // console.log(characterName);
         

                marvelAPi.character(characterName, function (res){
                    // console.log(res);
                    // cb(resp)
                    charactersID.push(res)
                    if (result.length === charactersID.length) {
                        // console.log(charactersID);
                        cb(charactersID);
                    }
                })

            }
        })

    }


}

export default moviesApi;