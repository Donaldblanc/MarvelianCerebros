import express from 'express'
import bodyParser from 'body-parser';
import path from 'path';
//import apiRoutes from './app/routing/apiRoutes';
//import htmlRoutes from './app/routing/htmlRoutes';


const app = express();
const PORT = process.env.PORT || 3000;


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.listen(PORT, () =>{ 
    console.log(`Server listening on: http://localhost:${PORT} `);
   
});