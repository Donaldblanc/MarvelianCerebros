require("dotenv").config();
//var path = require('path');
import path from 'path'
import fetch from 'node-fetch';
import marvelAPi from '../model/marvelApi'
import moviesAPi from '../model/moviesApi'
import chatAPi from '../model/chatApi'

export default function (app, io) {

    // var messages = [
    //     {name: 'Tim', message: 'Hi'},
    //     {name: 'Jane', message: 'Hello'}
    // ]
    //first route taken once page is opened, function only gets a callback no query needed here
    app.get("/api/movies", (request, response) => {
        moviesAPi.getMovies(function (results) {
            // console.log("Movie information: " + results)
            response.json(results);
        });
    });
    app.get("/api/movieCharacters/:characters", (request, response) => {
        let movieChar = request.params.characters;
        console.log("Movie in apicall: "+movieChar)
        moviesAPi.getCharacters(movieChar,function (results) {
            // console.log(results)
            response.json(results);
        });
    });

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

    app.get("/", (request, response)=>{

        response.sendFile(path.resolve('app/public/index.html'));
        
    })


    app.get("/messages", (request, response) =>{
    // console.log("in the messages route");
        chatAPi.getMessages(function (results){
            response.send(results);
        })
        //response.send(messages);
    });

    app.post('/messages', (req, res) => {
        io.emit('message', req.body)
         console.log(req.body.user)
        chatAPi.postBlog(req.body.user , req.body.comments, function (results){   
          console.log(results);
          res.sendStatus(200);
         })
       //  messages.push(req.body)
                
    });           

            

}// export default 
