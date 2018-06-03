require("dotenv").config();
import fetch from 'node-fetch';
import marvelAPi from '../model/marvelApi'
import moviesAPi from '../model/moviesApi'
import Sequelize from 'sequelize';

const sequelize = new Sequelize("marvel_db", "root", "Paganizonda1", { dialect: "mysql", host: '127.0.0.1', port: 3306 })

export default function (app) {

    //first route taken once page is opened, function only gets a callback no query needed here
    // app.get("/api/movies", (request, response) => {
    //     moviesAPi.getMovies(function (results) {
    //         // console.log("Movie information: " + results)
    //         response.json(results);
    //     });
    // });
    // app.get("/api/movieCharacters/:movie", (request, response) => {
    //     let movieChar = request.params.movie;
    //     console.log("Movie in apicall: " + movieChar)
    //     moviesAPi.getCharacters(movieChar, function (results) {
    //         // console.log(results)
    //         response.json(results);
    //     });
    // });

    app.get("/api/comics/:comicId?", (request, response) => {

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
    app.get('/api/movies', (req, res) => {
        const movieInfo = [];
        sequelize.query("SELECT movies, COUNT(*) AS C FROM marvel_db.movieCharacters GROUP BY movies HAVING C > 1 ORDER BY C DESC", { type: Sequelize.QueryTypes.SELECT }).then(result => {
            for (let i = 0; i < result.length; i++) {
                // let movieName = "Spider-Man"
                let movieName = result[i].movies.toString();
                let queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";
                fetch(queryUrl)
                    .then(response => response.json())
                    .catch(error => console.error('Error:', error))
                    .then(function (response) {

                        movieInfo.push(response);
                        if (movieInfo.length === result.length) {
                            res.json(movieInfo)
                        }
                    })
            }
        })
    });

    app.get('/api/movieCharacters/:movie', (req, res) => {
        const charactersID = [];
        let movieChar = req.params.movie;
        const q = `SELECT characters FROM marvel_db.movieCharacters WHERE movies = '${movieChar}';`;
        sequelize.query(q, { type: Sequelize.QueryTypes.SELECT }).then(result => {
            for (let i = 0; i < result.length; i++) {
                // let movieName = "Spider-Man"
                let characterName = result[i].characters.toString();

                marvelAPi.character(characterName, function (response) {
                    // console.log(res);
                    // cb(resp)
                    charactersID.push(response)
                    if (result.length === charactersID.length) {
                        res.json(charactersID);
                    }
                })

            }
        })
    });

}// export default 

