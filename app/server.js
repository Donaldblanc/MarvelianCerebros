import express from 'express'
import bodyParser from 'body-parser';
import path from 'path';
import apiRoutes from './routes/apiRoutes'

//import htmlRoutes from './app/routing/htmlRoutes';

const app = express();
const PORT = process.env.PORT || 3000;

var http = require('http').Server(app)
var io = require('socket.io')(http)





app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

io.on('connection', (socket) => {
    console.log('a user connected')
})

//route handlers
apiRoutes(app, io);

http.listen(PORT, () =>{ 
    console.log(`Server listening on: http://localhost:${PORT} `);
   
});