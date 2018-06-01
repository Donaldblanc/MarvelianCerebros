// Import the ORM to create functions that will interact with the database.
var orm = require("../data/orm.js");

var movies = {
    allMovies: function (cb) {
        orm.allMovies("movies", "marvel_db.movieCharacters", function (res) {
            // console.log(res);
            // console.log(res.movies);
            cb(res);
        });
    }
};

// Export the database functions for the controller s
module.exports = movies;