
import fetch from 'node-fetch';
import Marvel from "marvel";

const KEYS = require('../keys.js');
var marvel = new Marvel({ publicKey: KEYS.marvel.public_key, privateKey: KEYS.marvel.private_key})

let marvelApi = { 
    testCharacter: function (search, cb) {
       
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
    },
    character : function(name, cb) {
        marvel.characters
            .name(name)
            .get(function(err, resp) {
                if (err) { console.log("Error: ", err) 
                 }
                else { //console.log(resp); 
                   
                    cb(resp); 
                }
            })
    },
    comics: function(id, cb){
        //sharedAppearances
        //id: 1009351 : name hull
        marvel.comics
         .sharedAppearances([id])
         .get(function(err, resp) {
            if (err) { console.log("Error: ", err) 
             }
            else { //console.log(resp); 
               
                cb(resp); 
            }
        })

    }          
}

export default marvelApi ;