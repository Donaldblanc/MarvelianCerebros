var connection = require("../data/connection.js");

function printUserName(num) {
  var arr = [];

  for (var i = 0; i < num; i++) {
    arr.push("");
  }

  return arr.toString();
}

// Helper function to convert object key/value pairs to SQL syntax
function objToSql(ob) {
  var arr = [];
  // loop through the keys and push the key/value as a string int arr
  for (var key in ob) {
    var value = ob[key];
    // check to skip hidden properties
    if (Object.hasOwnProperty.call(ob, key)) {
      // if string with spaces, add quotations (User name => 'User Name')
      if (typeof value === "string" && value.indexOf(" ") >= 0) {
        value = "'" + value + "'";
      }
      arr.push(key + "=" + value);
    }
  }
  // translate array of strings to a single comma-separated string
  return arr.toString();
}
// Object for all our SQL statement functions.


var orm = {
  allMovies: function (colName, table, cb) {
    var queryString = "SELECT " + marvel_db.movie + ",";
    queryString += " COUNT(*) AS C FROM " + table;
    queryString += " GROUP BY " + colName;
    queryString += " HAVING C > 1";
    queryString += " ORDER BY C DESC";
    console.log("\n" + queryString);
    connection.query(queryString, function (err, result) {
      if (err) {
        throw err;
      }
      cb(result);
    });
  },
  allCharacters: function (movies, cb) {

    // select @id := id from movie where movies = "hulk";
    // SELECT movie_character
    // from characters
    // left join movie
    // on movie.id = characters.movieID
    // where movieID = @id

    let queryString = "SELECT @id:=id from movie where movies = '" + movies + "'; ";
    // queryString += "SELECT movie_character from characters ";
    //  queryString += "left join movie on movie.id = characters.movieID ";
    // queryString += "where movieID = @id ;";
    // console.log(queryString);
    connection.query(queryString, function (err, result) {
      if (err) {
        throw err;
      }
      var charID = Object.values(result[0]);
      // console.log(charID[0]);
      let queryString2 = "SELECT movie_character from characters ";
      queryString2 += "left join movie on movie.id = characters.movieID ";
      queryString2 += "where movieID = " + charID[0];
      // console.log(queryString2)
      connection.query(queryString2, function (err, result) {
        if (err) {
          throw err;
        }
        // console.log(result);
        cb(result);
      });
      // cb(result);
    });
  },
  all: function (tableInput, mm) {
    var queryString = "SELECT * FROM " + tableInput + ";";
    connection.query(queryString, function (err, result) {
      if (err) {
        throw err;
      }
      mm(result);
    });
  },
  create: function (table, cols, vals, mm) {
    var queryString = "INSERT INTO " + table;

    queryString += " (";
    queryString += cols.toString();
    queryString += ") ";
    queryString += "VALUES (";
    queryString += printQuestionMarks(vals.length);
    queryString += ") ";

    console.log(queryString);

    connection.query(queryString, vals, function (err, result) {
      if (err) {
        throw err;
      }

      mm(result);
    });
  },
  // An example of objColVals would be {name: panther, sleepy: true}
  update: function (table, cols, vals, mm) {
    var queryString = "INSERT INTO " + table;

    queryString += " (";
    queryString += cols.toString();
    queryString += ") ";
    queryString += "VALUES (";
    queryString += printQuestionMarks(vals.length);
    queryString += ") ";

    console.log(queryString);

    connection.query(queryString, vals, function (err, result) {
      if (err) {
        throw err;
      }

      mm(result);
    });
  },
  delete: function (table, cols, vals, mm) {
    var queryString = "INSERT INTO " + table;

    queryString += " (";
    queryString += cols.toString();
    queryString += ") ";
    queryString += "VALUES (";
    queryString += printQuestionMarks(vals.length);
    queryString += ") ";

    console.log(queryString);

    connection.query(queryString, vals, function (err, result) {
      if (err) {
        throw err;
      }

      mm(result);
    });
  },
};

// Export the orm object for the model (marvel.js).
module.exports = orm;
