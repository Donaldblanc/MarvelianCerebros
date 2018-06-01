
import fetch from 'node-fetch';
var movies = require("../data/movies.js");//import movies object from data folder
const movieInfo = [];
let moviesApi = {
    displayMovie: function (cb) {
        
        // console.log("FROM MOVIES API: "+cb(res));
        // cb(res);
        movies.allMovies(function (result) {
            console.log("DATA INSIDE moviesApi.js file :");
            console.log(result);
            console.log(result.length);
            // console.log("FROM MOVIES JS: "+res);
            // cb1(res);
            for (let i = 0; i < result.length; i++) {
                let movieName = result[i].movies.toString();
                let queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";
                fetch(queryUrl)
                .then((response,body) => {
                    // console.log(JSON.parse(body).Year)
                    movieInfo.push(JSON.parse(body).Year)
                })
                // request(queryUrl, function (error, response, body) {
                //     if (!error && response.statusCode === 200) {
                //         movieInfo.push(response);
                //         cb(response)
                //         //   console.log("Release Year: " + JSON.parse(body).Year);
                //     }
                // });
            }
            console.log(movieInfo);
        });
    }


}

export default moviesApi;