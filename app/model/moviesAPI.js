
import fetch from 'node-fetch';
var movies = require("../data/movies.js");//import movies object from data folder

let moviesApi = {
    displayMovie: function (cb) {
        console.log("FROM MOVIES API: "+cb(res));
        // cb(res);
        movies.allMovies(function (cb1) {
            console.log("FROM MOVIES JS: "+res);
            cb1(res);
            // for (let i = 0; i < movies.length; i++) {
            //     let movieName = movies[i].toString();
            //     let queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";
            //     request(queryUrl, function (error, response, body) {
            //         if (!error && response.statusCode === 200) {
            //             cb(response)
            //             //   console.log("Release Year: " + JSON.parse(body).Year);
            //         }
            //     });
            // }
        });
    }


}

export default moviesApi;