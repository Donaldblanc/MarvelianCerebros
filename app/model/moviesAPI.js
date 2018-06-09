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

                        movieInfo.push(response);
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
                let characterName = result[i].characters.toString();

                marvelAPi.character(characterName, function (res) {

                    // console.log(res);
                    // cb(resp)
                    charactersID.push(res)
                    if (result.length === charactersID.length) {
                        cb(charactersID);
                    }
                })

            }
        })
    },
    getTrailer: function (movieTitle, cb) {
        var queryURL = "https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=2&q=" + movieTitle + "trailer&key=AIzaSyC8th4wDxjLmTn1fONnkSMaUaGAGTUNQRA";
        console.log(queryURL);
        fetch(queryURL)
            .then(function (response_youtube) {
                return (response_youtube.json());
            }).then(function (response_youtube) {
                let video_Id = response_youtube.items[0].id.videoId;
                let videoLink = "https://www.youtube.com/embed/" + video_Id + "?autoplay=1";
                // console.log("Click the link: "+videoLink);
                cb([videoLink]);
            }).catch(function (response_youtube) {
                if (response_youtube) console.log(response_youtube);
            });
    }


}

export default moviesApi;