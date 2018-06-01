// Import the ORM to create functions that will interact with the database.
var orm = require("../javascript/orm.js");

var movies = {
  allMovies: function(cb) {
    orm.allMovies("movies","movieCharacters", function(res) {
      cb(res);
    });
  }
};

// Export the database functions for the controller s
module.exports = movies;