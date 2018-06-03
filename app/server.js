import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import apiRoutes from './routes/apiRoutes';
import history from 'connect-history-api-fallback';

//import htmlRoutes from './app/routing/htmlRoutes';


const app = express();
const PORT = process.env.PORT || 3000;


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//route handlers
apiRoutes(app);
app.use(history());

app.listen(PORT, () =>{ 
    console.log(`Server listening on: http://localhost:${PORT} `);
   
});