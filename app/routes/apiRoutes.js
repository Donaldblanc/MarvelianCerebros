require("dotenv").config();
import fetch from 'node-fetch';
import marvelAPi from '../model/marvelApi'
//import Marvel from "marvel";
//import * as KEYS  from '../keys.js';
import request from "request";//added request for working on OMDB API

//const KEYS = require('../keys.js');
export default function (app){
//Marvel movies

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

                marvelAPi.testCharacter(queryURL, function (results ){ 
                console.log("the results: " + results) 
                    response.json(results);
                });
                    
                console.log(`in the test character route`);
                //console.log(`this is what I get back: ${getCharacters(queryURL) }`);

            });
            app.get("/api/character", (request, response) =>{

                marvelAPi.character("Hulk", function(results){ 
                console.log("the results: " + results) 
              
                    response.json(results);
                });
                      
        
            });

}// export default 