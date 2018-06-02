
import fetch from 'node-fetch';
var movies = require("../data/movies.js");//import movies object from data folder
const movieInfo = [];
let moviesApi = {
    displayMovie: function (cb) {

        movies.allMovies(function (result) {
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
                        if (movieInfo.length === result.length){
                            cb(movieInfo)
                        }
                    })
            }

        })

    }


}

export default moviesApi;