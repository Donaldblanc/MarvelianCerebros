
import fetch from 'node-fetch';

let moviesApi = {
    character: function (name, cb) {
        for (let i = 0; i < movies.length; i++) {
            let movieName = movies[i].toString();
            let queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";
            request(queryUrl, function (error, response, body) {
                if (!error && response.statusCode === 200) {
                    cb(response)
                    //   console.log("Release Year: " + JSON.parse(body).Year);
                }
            });
        }
    }


}

export default moviesApi;