import express from 'express';
import dotenv from 'dotenv';
import {showMainPage, imgSrchPath, latestPath, returnBySearch, returnLatest} from './routes/main.js';
import stylus from 'stylus';
import nib from 'nib';

const app = express(),
      port = process.env.PORT || 5000,
      compile = (str, path)=> {
          return stylus(str)
              .set('filename', path)
              .use(nib());
      };

dotenv.config();
app.set( 'port', ( process.env.PORT || 5000 ));
app.set('views', __dirname + '/views');
app.set('view engine', 'pug');

app.use(stylus.middleware(
    { src: __dirname + '/public'
    , compile: compile
    }
));
app.use(express.static(__dirname + '/public'));


app.get('/', showMainPage);
app.get('/'+imgSrchPath, returnBySearch);
app.get('/'+latestPath, returnLatest);

app.listen(app.get('port'), ()=>{
    console.log(`The server is listening to port ${app.get('port')}`);
});
