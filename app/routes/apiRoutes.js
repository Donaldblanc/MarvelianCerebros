require("dotenv").config();
import fetch from 'node-fetch';
import Marvel from "marvel";
//import * as KEYS  from '../keys.js';
import request from "request";//added request for working on OMDB API

const KEYS = require('../keys.js');
export default function (app){
//Marvel movies
const movies = ["Howard the Duck", "The Punisher ", "Captain America", "The Fantastic Four", "Blade",
  "X-Men","Blade II","Spider-Man","Daredevil","Hulk","Spider-Man 2","Blade: Trinity","Elektra","Man-Thing","Fantastic Four",
  "X-Men: The Last Stand","Ghost Rider","Spider-Man 3","Rise of the Silver Surfer","Iron Man","The Incredible Hulk",
  "Punisher: War Zone","X-Men Origins","Iron Man 2","Thor","X-Men: First Class","Captain America: The First Avenger",
  "Ghost Rider: Spirit of Vengeance","Avengers","The Amazing Spider-Man","Iron Man 3","The Wolverine","Thor: The Dark World",
  "Captain America: The Winter Soldier","The Amazing Spider-Man 2","X-Men: Days of Future Past","Guardians of the Galaxy",
  "Big Hero 6","Avengers: Age of Ultron","Ant-Man","Deadpool","Captain America: Civil War","X-Men: Apocalypse",
  "Doctor Strange","Logan","Guardians of the Galaxy Vol. 2","Spider-Man: Homecoming","Thor: Ragnarok","Black Panther"];
// marvel API calls
const apiAuth = "&ts=1&apikey=0c59a3c44e014ddc1ffcdf3ff74fc90f&hash=a6c84b3cc66e3a92494635469be8bd74";
const marvURL = "https://gateway.marvel.com/v1/public/";
var charSearch = "characters?name=";
var name = "spider-man";
var charId = "";
var queryURL = marvURL + charSearch + name + apiAuth;
    //first route taken once page is opened
    app.get("/",(request,response) => { 
       displayMovie(queryURL , function (results ){ 
        console.log("Movie information: " + results) 
            response.json(results);
        });
    });

    app.get("/api/testcharacter", (request, response) =>{

        getCharacters(queryURL, function (results ){ 
        console.log("the results: " + results) 

            response.json(results);
        });
              
        console.log(`in the test character route`);
        //console.log(`this is what I get back: ${getCharacters(queryURL) }`);

    });

}// export default 


function getCharacters(search, cb) {
       
                fetch(search)
                .then(response => response.json())
                .catch(error => console.error('Error:', error))
                .then(function (response) {
                    if (response.data.results.length > 0) {
                    //charId = response.data.results[0].id;
                    //console.log(`The get Character function: \n ${JSON.stringify(response)}`);
                    cb(response);
                  
                    //console.log("We found a character");
                    } else {
                    //console.log("Sorry no results for this character");
                    }
            
                });               
//return data;

}//getQuery
  
//function for displaying movies through request
var displayMovie = (search,cb) =>{
    for (let i = 0 ; i < movies.length ; i++){
        let movieName = movies[i].toString();
        let queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";
        request(queryUrl, function(error, response, body) {
            if (!error && response.statusCode === 200) {              
                cb(response)
            //   console.log("Release Year: " + JSON.parse(body).Year);
            }
          });
    }
} 

 console.log(KEYS)
var marvel = new Marvel({ publicKey: KEYS.marvel.public_key, privateKey: KEYS.marvel.private_key})

//var marvel = new Marvel({ publicKey: "<pubKey>", privateKey: "<privateKey>"})
 
marvel.characters
  .name("Hulk")
  .get(function(err, resp) {
    if (err) { console.log("Error: ", err) }
    else { console.log(resp) }
  })