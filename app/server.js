import express from 'express'
import bodyParser from 'body-parser';
import path from 'path';
import history from 'connect-history-api-fallback';
import apiRoutes from './routes/apiRoutes';
//import htmlRoutes from './app/routing/htmlRoutes';


const app = express();
const PORT = process.env.PORT || 3000;


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/api', apiRoutes);
app.use(history());

app.use(express.static(path.join(__dirname, 'client/dist')));


app.listen(PORT, () => {
    console.log(`Server listening on: http://localhost:${PORT} `);

});