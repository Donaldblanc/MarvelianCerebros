require("dotenv").config();
import fetch from 'node-fetch';
import marvelAPi from '../model/marvelApi';
import moviesAPi from '../model/moviesApi';
import chatAPi from '../model/chatApi';
import Sequelize from 'sequelize';
import path from 'path';

const sequelize = new Sequelize("marvel_db", "root", "root", { dialect: "mysql", host: '127.0.0.1', port: 3306 });

export default function (app, io, express) {

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
    // app.get('/', (req, res) => {
    //     console.log("in the / route");
    //    // res.sendFile(path.resolve('/dist/index.html'));
    //   response.app.use(express.static(path.join(__dirname, 'client/dist')))
    //   // res.sendFile('app/client/dist/index.html');
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
    app.get("/api/movieTrailer/:movieTitle", (request, response) => {
        const movieTitle = request.params.movieTitle;
        console.log(movieTitle);
        moviesAPi.getTrailer(movieTitle, function (results) {
            response.json(results);
        });
    });
    app.get("/messages", (request, response) => {
        // console.log("in the messages route");
        chatAPi.getMessages(function (results) {
            response.send(results);
        });
        //response.send(messages);
    });
    app.post('/messages', (req, res) => {
        io.emit('message', req.body)
        console.log(req.body.user)
        chatAPi.postBlog(req.body.user, req.body.comments, function (results) {
            console.log(results);
            res.sendStatus(200);
        });
        //  messages.push(req.body)
    });

}// export default 


