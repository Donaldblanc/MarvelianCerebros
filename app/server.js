import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import apiRoutes from './routes/apiRoutes';
import history from 'connect-history-api-fallback';

//import htmlRoutes from './app/routing/htmlRoutes';


const app = express();
const PORT = process.env.PORT || 3000;
const http = require('http').Server(app)
const io = require('socket.io')(http)

io.on('connection', (socket) => {
    console.log('a user connected')
})


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//route handlers
apiRoutes(app, io, express);
app.use(history());
app.use(express.static(path.join(__dirname, 'client/dist')));

http.listen(PORT, () =>{ 
    console.log(`Server listening on: http://localhost:${PORT} `);
   
});