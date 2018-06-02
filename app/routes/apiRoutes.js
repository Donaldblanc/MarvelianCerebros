require("dotenv").config();
import fetch from 'node-fetch';
import marvelAPi from '../model/marvelApi'
import moviesAPi from '../model/moviesApi'
//import Marvel from "marvel";
//import * as KEYS  from '../keys.js';
import request from "request";//added request for working on OMDB API

//const KEYS = require('../keys.js');
export default function (app) {
    //Marvel movies

    const apiAuth = "&ts=1&apikey=0c59a3c44e014ddc1ffcdf3ff74fc90f&hash=a6c84b3cc66e3a92494635469be8bd74";
    const marvURL = "https://gateway.marvel.com/v1/public/";
    var charSearch = "characters?name=";
    var name = "spider-man";
    var charId = "";
    var queryURL = marvURL + charSearch + name + apiAuth;
    //first route taken once page is opened, function only gets a callback no query needed here
    app.get("/api/movies", (request, response) => {
        moviesAPi.displayMovie(function (results) {
            // console.log("Movie information: " + results)
            response.json(results);
        });
    });

    app.get("/api/testcharacter", (request, response) => {

        marvelAPi.testCharacter(queryURL, function (results) {
            console.log("the results: " + results)
            response.json(results);
        });

        console.log(`in the test character route`);
        //console.log(`this is what I get back: ${getCharacters(queryURL) }`);

    });

            app.get("/api/character/:character?", (request, response) =>{
                let mChar = request.params.character;
                    
                    if(mChar != null){
                        marvelAPi.character(mChar, function(results){ 
                            console.log("the results: " + results) 
                            response.json(results);
                        });
                
                }else{
                    marvelAPi.character("Hulk", function(results){ 
                        console.log("the results: " + results) 
                            response.json(results);
                        });
                }
                
            });

            app.get("/api/comics/:comicId?", (request, response) =>{

                let comic = request.params.comicId;
                //console.log(comic);
                if(comic != null){
                    marvelAPi.comics(comic, function(results){
                        // console.log("comics results: " + results) 
                         response.json(results);
                      });

                }
                else{
                    marvelAPi.comics('1009351', function(results){
                        // console.log("comics results: " + results) 
                         response.json(results);
                         });
                }

                 
           
            });

}// export default 
