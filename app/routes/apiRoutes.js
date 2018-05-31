require("dotenv").config();
import fetch from 'node-fetch';
import Marvel from "marvel";
//import * as KEYS  from '../keys.js';


const KEYS = require('../keys.js');
export default function (app){

// marvel API calls

const apiAuth = "&ts=1&apikey=0c59a3c44e014ddc1ffcdf3ff74fc90f&hash=a6c84b3cc66e3a92494635469be8bd74";
const marvURL = "https://gateway.marvel.com/v1/public/";
var charSearch = "characters?name=";
var name = "spider-man";
var charId = "";
var queryURL = marvURL + charSearch + name + apiAuth;



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
  


 console.log(KEYS)
var marvel = new Marvel({ publicKey: KEYS.marvel.public_key, privateKey: KEYS.marvel.private_key})

//var marvel = new Marvel({ publicKey: "<pubKey>", privateKey: "<privateKey>"})
 
marvel.characters
  .name("Hulk")
  .get(function(err, resp) {
    if (err) { console.log("Error: ", err) }
    else { console.log(resp) }
  })