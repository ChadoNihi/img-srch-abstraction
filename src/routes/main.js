const https = require('https'),
      google = require('googleapis'),
      customsearch = google.customsearch('v1'), // http://google.github.io/google-api-nodejs-client/14.0.0/customsearch.html

      imgSrchPath = 'image-search',
      latestPath = imgSrchPath+'/latest';

var latestQ = 'factory%20farming',
    ajaxOptions = {
        headers: {
           'Content-Type': 'application/json'
        },
        hostname: 'www.googleapis.com',
        json: true,
        method: 'GET',
        port: 443
    };


exports.imgSrchPath = imgSrchPath;
exports.latestPath = latestPath;

exports.showMainPage = (req, res)=> {
  var url = req.protocol + '://' + req.get('host') + req.originalUrl;

  res.render('index', { url: url,
                        title: 'Instructions | JSON Image Search',
                        imgSrchPath: imgSrchPath,
                        latestPath: latestPath,
                        latestQ: latestQ
                      });
};

exports.returnBySearch = (req, res)=> {
  var params = {
    cx: process.env.CX,
    key: process.env.SEARCH_KEY,
    q: req.query.q,
    num: 4,
    searchType: 'image'
  };
  console.log(params);
  customsearch.cse.list(params, (data)=>{
    console.log(data);
    res.send(data);
  });
  /*ajaxOptions.path = `/customsearch/v1?q=nuts&cx=${process.env.CX}&searchType=image&key=${process.env.SEARCH_KEY}`;
  ajaxOptions.path += `&q=${latestQ}`;

  https.request(ajaxOptions, (res2)=>{
    var data = '';
    console.log('receiving data');
    res2.setEncoding('utf8');

    res2.on('data', d=>{
      data += d;
    });
    res2.end(()=>{
      res.send(data);
    });
  });*/
},

exports.returnLatest = (req, res)=> {

};
