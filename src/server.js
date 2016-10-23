const express = require('express'),
      dotenv = require('dotenv'),
      routes = require('./routes/main.js'),
      stylus = require('stylus'),
      nib = require('nib'),

      app = express(),
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
    { src: __dirname + '/'
    , compile: compile
    }
));
app.use(express.static(__dirname + '/'));


app.get('/', routes.showMainPage);
app.get('/'+routes.imgSrchPath, routes.returnBySearch);
app.get('/'+routes.latestPath, routes.returnLatest);

app.listen(app.get('port'), ()=>{
  console.log(`The server is listening to port ${app.get('port')}`);
});
