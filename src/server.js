import express from 'express';
import dotenv from 'dotenv';
import {showMainPage} from './routes';
import stylus from 'stylus';
import nib from 'nib';

const app = express(),
      port = process.env.PORT || 5000,
      srchEngApi = 'https://www.googleapis.com/customsearch/v1?q=nuts&cx=013008978640622301934%3Ayuqjeg-j9km&searchType=image&key='+process.env.SEARCH_KEY,
      compile = (str, path)=> {
          return stylus(str)
              .set('filename', path)
              .use(nib());
      };

dotenv.config();
app.set( 'port', ( process.env.PORT || 5000 ));
app.set('views', __dirname + '/views');
app.set('view engine', 'pug');


app.get('/', showMainPage);
app.get('/img-srch', returnBySearch);
app.get('/img-srch/latest', returnLatest);

app.listen(app.get('port'), 'localhost', ()=>{
    console.log(`The server is listening to port ${app.get('port')}`);
});
